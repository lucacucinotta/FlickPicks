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
      findOneAndUpdate: jest.fn(),
    },
  };
});

describe("PUT", () => {
  describe("PUT /updateMovieList", () => {
    test("should return 200 if a movieID is added", async () => {
      const action = "add";
      const movieID = "123";
      const list = "watchedList";

      const token = jwt.sign({ username: "username" }, SECRET_KEY);

      User.findOneAndUpdate.mockResolvedValue({ success: true });

      const response = await request(app)
        .put("/updateMovieList")
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
        .put("/updateMovieList")
        .set("Cookie", `token=${token}`)
        .send({ action, list, movieID })
        .expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Movie removed successfully."
      );
    });

    test("should return 401 if token is missing", async () => {
      const response = await request(app).put("/updateMovieList").expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Token is missing");
    });

    test("should return 401 if token is invalid", async () => {
      const token = jwt.sign({ username: "username" }, "invalid_key");

      const response = await request(app)
        .put("/updateMovieList")
        .set("Cookie", `token=${token}`)
        .expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Invalid token.");
    });

    test("should return 500 if an error occurs", async () => {
      User.findOneAndUpdate.mockRejectedValue(new Error("Database error"));

      const action = "add";
      const list = "watchedList";
      const movieID = "123";
      const token = jwt.sign({ username: "username" }, SECRET_KEY);

      const response = await request(app)
        .put("/updateMovieList")
        .set("Cookie", `token=${token}`)
        .send({ action, list, movieID })
        .expect(500);

      expect(response.body).toHaveProperty(
        "errMessage",
        "Internal Server Error."
      );
    });
  });
});
