const request = require("supertest");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { User } = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
const app = require("../../app");
const bcrypt = require("bcrypt");

const SECRET_KEY = process.env.SECRET_KEY;

jest.mock("../../models/userSchema", () => {
  const originalModel = jest.requireActual("../../models/userSchema");
  return {
    ...originalModel,
    User: {
      ...originalModel.User,
      create: jest.fn(),
      findOne: jest.fn(),
    },
  };
});

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
  genSalt: jest.fn(),
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
    describe("tests on already use credentials", () => {
      test("should return 409 if username is already in use", async () => {
        const userData = {
          username: "username",
          email: "exam@email.com",
          password: "Password0!",
        };

        User.findOne.mockImplementation(async (query) => {
          if (query.username === userData.username) {
            return { username: userData.username };
          }
          return null;
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

        User.findOne.mockImplementation(async (query) => {
          if (query.email === userData.email) {
            return { email: userData.email };
          }
          return null;
        });

        const response = await request(app)
          .post("/signup")
          .send(userData)
          .expect(409);

        expect(response.body.errMessage).toBeTruthy();
        expect(response.body.errMessage).toContain("Email already in use.");
      });
    });

    test("should return 201 if user was created", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };

      User.findOne.mockResolvedValue();

      const mockSalt = "mocked_salt";
      bcrypt.genSalt.mockResolvedValue(mockSalt);
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

    test("should return 500 if an internal error occurs", async () => {
      const userData = {
        username: "username",
        email: "example@email.com",
        password: "Password0!",
      };

      User.findOne.mockResolvedValue();

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

  describe("POST /logout", () => {
    test("should return 200 if logout is complete successfully", async () => {
      const response = await request(app).post("/logout").expect(200);

      expect(response.body).toHaveProperty(
        "message",
        "Logged out successfully!"
      );
    });

    test("should return 500 if an internal server error is occurs", async () => {
      const originalCookieFn = app.response.cookie;
      app.response.cookie = jest.fn(() => {
        throw new Error("Some internal error");
      });

      const response = await request(app)
        .post("/logout")
        .expect("Content-Type", /json/)
        .expect(500);

      app.response.cookie = originalCookieFn;

      expect(response.body.message).toBe("Internal Server Error.");
    });
  });
});

describe("GET", () => {
  describe("GET /protectedRoute", () => {
    test("should return 401 if there isn't any token", async () => {
      const response = await request(app).get("/protectedRoute").expect(401);

      expect(response.body).toHaveProperty(
        "errMessage",
        "Access denied. Please login."
      );
    });

    test("should return 401 if token is invalid", async () => {
      const token = jwt.sign({ username: "username" }, "invalidSecretToken");
      const response = await request(app)
        .get("/protectedRoute")
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
        .get("/protectedRoute")
        .set("Cookie", `token="${token}"`)
        .expect(200);

      expect(response.body).toHaveProperty("message", "Success.");
    });
  });
});
