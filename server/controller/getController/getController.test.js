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

describe("GET", () => {
  describe("GET /check_token", () => {
    test("should return 401 if there isn't any token", async () => {
      const response = await request(app).get("/check_token").expect(401);

      expect(response.body).toHaveProperty(
        "errMessage",
        "Access denied. Please login."
      );
    });

    test("should return 401 if token is invalid", async () => {
      const token = jwt.sign({ username: "username" }, "invalidSecretToken");
      const response = await request(app)
        .get("/check_token")
        .set("Cookie", `token="${token}"`)
        .expect(401);

      expect(response.body).toHaveProperty(
        "errMessage",
        "Invalid token. Please login again."
      );
    });

    test("should return 200 if token is valid", async () => {
      const token = jwt.sign({ username: "username" }, SECRET_KEY);
      const response = await request(app)
        .get("/check_token")
        .set("Cookie", `token="${token}"`)
        .expect(200);

      expect(response.body).toHaveProperty("message", "Success.");
    });
  });

  describe("GET /checkMovieID/:movieID", () => {
    test("should return 200 if the ID is contained in lists", async () => {
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
        .get(`/checkMovieID/${movieID}`)
        .set("Cookie", `token=${token}`);

      expect(response.body).toEqual({
        isInLists: true,
        listTypes: ["watchedList"],
      });
    });

    test("should return 404 if the ID doesn't contained in lists", async () => {
      const movieID = "123";
      const user = {
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
        .get(`/checkMovieID/${movieID}`)
        .set("Cookie", `token=${token}`);

      expect(response.body).toHaveProperty("message", "MovieID not found.");
    });

    test("should return 401 if token is missing", async () => {
      const movieID = "123";
      const response = await request(app)
        .get(`/checkMovieID/${movieID}`)
        .expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Token is missing");
    });

    test("should return 401 if token is invalid", async () => {
      const movieID = "123";
      const token = jwt.sign({ username: "username" }, "invalid_key");

      const response = await request(app)
        .get(`/checkMovieID/${movieID}`)
        .set("Cookie", `token=${token}`)
        .expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Invalid token.");
    });

    test("should return 500 if an internal error occurs", async () => {
      const movieID = "123";
      User.findOne.mockRejectedValue(new Error("Database error"));

      const token = jwt.sign({ username: "username" }, SECRET_KEY);

      const response = await request(app)
        .get(`/checkMovieID/${movieID}`)
        .set("Cookie", `token=${token}`)
        .expect(500);

      expect(response.body).toHaveProperty(
        "errMessage",
        "Internal Server Error."
      );
    });
  });

  describe("GET /getUserData", () => {
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
        .get("/getUserData")
        .set("Cookie", `token=${token}`)
        .expect(200);

      expect(response.body).toEqual({
        userID: user._id,
        username: user.username,
      });
    });
    test("should return 401 if token is missing", async () => {
      const response = await request(app).get("/getUserData").expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Token is missing");
    });

    test("should return 401 if token is invalid", async () => {
      const token = jwt.sign({ username: "username" }, "invalid_key");

      const response = await request(app)
        .get("/getUserData")
        .set("Cookie", `token=${token}`)
        .expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Invalid token.");
    });

    test("should return 500 if an internal error occurs", async () => {
      const token = jwt.sign({ username: "username" }, SECRET_KEY);

      User.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/getUserData")
        .set("Cookie", `token=${token}`)
        .expect(500);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Internal Server Error.");
    });
  });

  describe("GET /getUserLists/:userID", () => {
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
        .get("/getUserLists")
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
      const response = await request(app).get("/getUserLists").expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Token is missing");
    });

    test("should return 401 if token is invalid", async () => {
      const token = jwt.sign({ username: "username" }, "invalid_key");

      const response = await request(app)
        .get("/getUserLists")
        .set("Cookie", `token=${token}`)
        .expect(401);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Invalid token.");
    });

    test("should return 500 if an internal error occurs", async () => {
      const token = jwt.sign({ username: "username" }, SECRET_KEY);

      User.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .get("/getUserLists")
        .set("Cookie", `token=${token}`)
        .expect(500);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Internal Server Error.");
    });
  });
});
