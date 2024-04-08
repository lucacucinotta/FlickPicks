const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const { User } = require("../../models/userSchema");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

jest.mock("../../models/userSchema", () => {
  const originalModel = jest.requireActual("../../models/userSchema");
  return {
    ...originalModel,
    User: {
      ...originalModel.User,
      findOne: jest.fn(),
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /movies/:movieID", () => {
  test("should return 200 when an authenticated user make an request", async () => {
    const movieID = "123";
    const user = {
      _id: 123,
      username: "username",
      email: "email@example.com",
      password: "password",
      watchedList: [movieID],
      favoriteList: [],
      watchList: [],
    };
    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    User.findOne.mockResolvedValue(user);

    const response = await request(app)
      .get(`/movies/${movieID}`)
      .set("Cookie", `token=${token}`);

    expect(response.body).toEqual({
      isInLists: true,
      listTypes: ["watchedList"],
    });
  });

  test("should return 401 if token is missing", async () => {
    const movieID = "123";
    const response = await request(app).get(`/movies/${movieID}`).expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Access denied. Please login.");
  });

  test("should return 401 if token is invalid", async () => {
    const movieID = "123";
    const token = jwt.sign({ username: "username" }, "invalid_key");

    const response = await request(app)
      .get(`/movies/${movieID}`)
      .set("Cookie", `token=${token}`)
      .expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain(
      "Invalid token. Please login again."
    );
  });

  test("should return 500 if an internal error occurs", async () => {
    const movieID = "123";
    User.findOne.mockRejectedValue(new Error("Database error"));

    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    const response = await request(app)
      .get(`/movies/${movieID}`)
      .set("Cookie", `token=${token}`)
      .expect(500);

    expect(response.body).toHaveProperty(
      "errMessage",
      "Internal Server Error."
    );
  });
});
