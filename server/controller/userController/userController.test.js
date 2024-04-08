const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const SECRET_KEY = process.env.SECRET_KEY;

jest.mock("../../models/userSchema", () => {
  const originalModel = jest.requireActual("../../models/userSchema");
  return {
    ...originalModel,
    User: {
      ...originalModel.User,
      findOne: jest.fn(),
      findOneAndUpdate: jest.fn(),
    },
  };
});

beforeEach(() => {
  jest.clearAllMocks();
});

describe("GET /users/me", () => {
  test("should return 200 when we get the user's data", async () => {
    const user = {
      _id: 123,
      username: "username",
      email: "email@example.com",
      password: "password",
      watchedList: [],
      favoriteList: [],
      watchList: [],
    };
    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    User.findOne.mockResolvedValue(user);

    const response = await request(app)
      .get("/users/me")
      .set("Cookie", `token=${token}`)
      .expect(200);

    expect(response.body).toEqual({
      userID: user._id,
      username: user.username,
    });
  });
  test("should return 401 if token is missing", async () => {
    const response = await request(app).get("/users/me").expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Access denied. Please login.");
  });

  test("should return 401 if token is invalid", async () => {
    const token = jwt.sign({ username: "username" }, "invalid_key");

    const response = await request(app)
      .get("/users/me")
      .set("Cookie", `token=${token}`)
      .expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain(
      "Invalid token. Please login again."
    );
  });

  test("should return 500 if an internal error occurs", async () => {
    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/users/me")
      .set("Cookie", `token=${token}`)
      .expect(500);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Internal Server Error.");
  });
});

describe("GET /users/me/lists", () => {
  it("should return 200 when we get the user's lists", async () => {
    const user = {
      _id: 123,
      username: "username",
      email: "email@example.com",
      password: "password",
      watchedList: [],
      favoriteList: [],
      watchList: [],
    };

    const token = jwt.sign({ username: user.username }, SECRET_KEY);

    User.findOne.mockResolvedValue(user);

    const response = await request(app)
      .get("/users/me/lists")
      .set("Cookie", `token=${token}`)
      .expect(200);

    expect(response.body).toEqual({
      userLists: {
        watchedList: user.watchedList,
        favoriteList: user.favoriteList,
        watchList: user.watchList,
      },
    });
  });
  test("should return 401 if token is missing", async () => {
    const response = await request(app).get("/users/me/lists").expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Access denied. Please login.");
  });

  test("should return 401 if token is invalid", async () => {
    const token = jwt.sign({ username: "username" }, "invalid_key");

    const response = await request(app)
      .get("/users/me/lists")
      .set("Cookie", `token=${token}`)
      .expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain(
      "Invalid token. Please login again."
    );
  });

  test("should return 500 if an internal error occurs", async () => {
    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    User.findOne.mockRejectedValue(new Error("Database error"));

    const response = await request(app)
      .get("/users/me/lists")
      .set("Cookie", `token=${token}`)
      .expect(500);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Internal Server Error.");
  });
});

describe("PUT /users/me/lists/:list", () => {
  test("should return 200 if a movieID is added", async () => {
    const action = "add";
    const movieID = "123";
    const list = "watchedList";

    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    User.findOneAndUpdate.mockResolvedValue({ success: true });

    const response = await request(app)
      .put("/users/me/lists/:list")
      .set("Cookie", `token=${token}`)
      .send({ action, list, movieID })
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Movie addedd successfully."
    );
  });

  test("should return 200 if a movieID is removed", async () => {
    const action = "remove";
    const movieID = "123";
    const list = "watchedList";

    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    User.findOneAndUpdate.mockResolvedValue({ success: true });

    const response = await request(app)
      .put("/users/me/lists/:list")
      .set("Cookie", `token=${token}`)
      .send({ action, list, movieID })
      .expect(200);

    expect(response.body).toHaveProperty(
      "message",
      "Movie removed successfully."
    );
  });

  test("should return 401 if token is missing", async () => {
    const response = await request(app)
      .put("/users/me/lists/:list")
      .expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain("Access denied. Please login.");
  });

  test("should return 401 if token is invalid", async () => {
    const token = jwt.sign({ username: "username" }, "invalid_key");

    const response = await request(app)
      .put("/users/me/lists/:list")
      .set("Cookie", `token=${token}`)
      .expect(401);

    expect(response.body.errMessage).toBeTruthy();
    expect(response.body.errMessage).toContain(
      "Invalid token. Please login again."
    );
  });

  test("should return 500 if an error occurs", async () => {
    User.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

    const action = "add";
    const list = "watchedList";
    const movieID = "123";
    const token = jwt.sign({ username: "username" }, SECRET_KEY);

    const response = await request(app)
      .put("/users/me/lists/:list")
      .set("Cookie", `token=${token}`)
      .send({ action, list, movieID })
      .expect(500);

    expect(response.body).toHaveProperty(
      "errMessage",
      "Internal Server Error."
    );
  });
});
