const request = require("supertest");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { User } = require("../../models/userSchema");
const app = require("../../app");
const bcrypt = require("bcrypt");

jest.mock("../../models/userSchema", () => {
  const originalModel = jest.requireActual("../../models/userSchema");
  return {
    ...originalModel,
    User: {
      ...originalModel.User,
      create: jest.fn(),
      exists: jest.fn(),
      findOne: jest.fn(),
    },
  };
});

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

describe("POST", () => {
  describe("POST /signup", () => {
    describe("tests on bad requests", () => {
      test("should return 422 for empty username", async () => {
        const userData = {
          username: "",
          email: "email@example.com",
          password: "Password0!",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain("Please enter a username.");
      });

      test("should return 422 for invalid username", async () => {
        const userData = {
          username: "aa",
          email: "email@example.com",
          password: "Password0!",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain(
          "Invalid username. Please retry."
        );
      });

      test("should return 422 for empty email", async () => {
        const userData = {
          username: "username",
          email: "",
          password: "Password0!",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain(
          "Please enter an email address."
        );
      });

      test("should return 422 for invalid email", async () => {
        const userData = {
          username: "username",
          email: "email.com",
          password: "Password0!",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain(
          "Invalid email address. Please retry."
        );
      });

      test("should return 422 for empty password", async () => {
        const userData = {
          username: "username",
          email: "example@email.com",
          password: "",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain("Please enter a password.");
      });

      test("should return 422 for invalid password", async () => {
        const userData = {
          username: "username",
          email: "example@email.com",
          password: "password",
        };

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(422);

        expect(response.body.errMessages).toBeTruthy();
        expect(response.body.errMessages).toContain(
          "Invalid password. Please retry."
        );
      });
    });

    test("should return 201 if user was created", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };
      bcrypt.hash.mockResolvedValue("mockedHashValue");

      const mockUserBack = {
        _id: new ObjectId().toString(),
        username: userData.username,
        email: userData.email,
        password: "mockedHashValue",
        watchedList: [],
        favoriteList: [],
        watchList: [],
      };

      User.create.mockResolvedValue(mockUserBack);

      const response = await request(app)
        .post("/signup")
        .send(userData)
        .expect(201);

      expect(User.create).toHaveBeenCalledWith({
        ...userData,
        password: "mockedHashValue",
      });
      expect(response.body).toEqual(mockUserBack);
    });

    test("should return 409 if username is already in use", async () => {
      const userData = {
        username: "username",
        email: "exam@email.com",
        password: "Password0!",
      };

      User.exists.mockResolvedValue(true);
      User.create.mockRejectedValue({
        code: 11000,
        keyValue: { username: "username" },
      });

      const response = await request(app)
        .post("/signup")
        .send(userData)
        .expect(409);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Username already in use.");
    });

    test("should return 409 if email is already in use", async () => {
      const userData = {
        username: "user_name",
        email: "example@email.com",
        password: "Password0!",
      };

      User.exists.mockResolvedValue(true);
      User.create.mockRejectedValue({
        code: 11000,
        keyValue: { email: "example@email.com" },
      });

      const response = await request(app)
        .post("/signup")
        .send(userData)
        .expect(409);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Email already in use.");
    });

    test("should return 500 if an internal error occurs", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };
      User.create.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/signup")
        .send(userData)
        .expect(500);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Internal Server Error.");
    });
  });

  describe("POST /login", () => {
    test("should return 404 if username is not linked at any account", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };
      User.findOne.mockResolvedValue(null);
      const response = await request(app)
        .post("/login")
        .send(userData)
        .expect(404);
      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain(
        "The username you entered is not linked to any account."
      );
    });

    test("should return 404 if password is not correct", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0?",
      };

      bcrypt.hash.mockResolvedValue("mockedHashValue");

      const existingUser = {
        _id: new ObjectId().toString(),
        username: "username",
        email: "example@email.com",
        password: "mockedHashValue",
        watchedList: [],
        favoriteList: [],
        watchList: [],
      };

      User.findOne.mockResolvedValue(existingUser);

      bcrypt.compare.mockResolvedValue(false);

      const response = await request(app)
        .post("/login")
        .send(userData)
        .expect(404);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain(
        "The password you entered is not correct."
      );
    });
    test("should return 200 for successfull login", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };

      bcrypt.hash.mockResolvedValue("mockedHashValue");

      const existingUser = {
        _id: new ObjectId().toString(),
        username: "username",
        email: "example@email.com",
        password: "mockedHashValue",
        watchedList: [],
        favoriteList: [],
        watchList: [],
      };

      User.findOne.mockResolvedValue(existingUser);

      bcrypt.compare.mockResolvedValue(true);

      const response = await request(app)
        .post("/login")
        .send(userData)
        .expect(200);

      expect(response.body).toHaveProperty("message", "Login successfully.");
    });

    test("should return 500 if an internal error occurs", async () => {
      const userData = {
        username: "username",
        password: "Password0!",
      };
      User.findOne.mockRejectedValue(new Error("Database error"));

      const response = await request(app)
        .post("/login")
        .send(userData)
        .expect(500);

      expect(response.body.errMessage).toBeTruthy();
      expect(response.body.errMessage).toContain("Internal Server Error.");
    });
  });
});
