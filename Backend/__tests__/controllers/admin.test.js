import { register, login, logout,getAdmin,updateAdmin } from "../../controllers/admin.controller";
import Admin from "../../models/admin.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


jest.mock("../../models/admin.model");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("Admin Controller", () => {
  let req;
  let res;
  beforeEach(() => {
    req = {
      body: {
        username: "admin",
        password: "password",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      cookie: jest.fn().mockReturnThis(),
      clearCookie: jest.fn().mockReturnThis(),
    };
  });

  describe("Register", () => {
    it("should create a new admin", async () => {
      const save = jest.fn();
      Admin.mockImplementation(() => ({
        save,
      }));

      await register(req, res);

      expect(bcrypt.hashSync).toHaveBeenCalledWith(req.body.password, 7);
      expect(Admin).toHaveBeenCalledWith({
        ...req.body,
        password: bcrypt.hashSync(),
      });
      expect(save).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.send).toHaveBeenCalledWith("Admin has been created.");
    });

    it("should return 500 if something went wrong", async () => {
      Admin.mockImplementation(() => ({
        save: jest.fn().mockRejectedValue(new Error("error")),
      }));

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith(
        "something went wrong. try again with valid username, password "
      );
    });
  });

  describe("Login", () => {
    it("should login an admin", async () => {
      const admin = {
        _id: "id",
        username: "admin",
        password: "password",
        _doc: {
          _id: "id",
          username: "admin",
        },
      };
      Admin.findOne.mockResolvedValue(admin);
      bcrypt.compareSync.mockReturnValue(true);
      jwt.sign.mockReturnValue("webtoken");

      await login(req, res);

      expect(Admin.findOne).toHaveBeenCalledWith({
        username: req.body.username,
      });
      expect(bcrypt.compareSync).toHaveBeenCalledWith(
        req.body.password,
        admin.password
      );
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: admin._id },
        process.env.TOKEN_KEY
      );
      expect(res.cookie).toHaveBeenCalledWith("accessToken", "webtoken", {
        httpOnly: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith({ ...admin._doc, role: "admin" });
    });

    it("should return 404 if admin not found", async () => {
      Admin.findOne.mockResolvedValue(null);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.send).toHaveBeenCalledWith("Admin not found!");
    });

    it("should return 400 if wrong password", async () => {
      const admin = {
        _id: "id",
        username: "admin",
        password: "password",
        _doc: {
          _id: "id",
          username: "admin",
        },
      };
      Admin.findOne.mockResolvedValue(admin);
      bcrypt.compareSync.mockReturnValue(false);

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.send).toHaveBeenCalledWith("Wrong Username or Password");
    });

    it("should return 500 if something went wrong", async () => {
      Admin.findOne.mockRejectedValue(new Error("error"));

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith("something went wrong");
    });
  });

  describe("Logout", () => {
    it("should logout an admin", async () => {
      const req = {};
      const res = {
        clearCookie: jest.fn().mockReturnThis(),
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };

      await logout(req, res);

      expect(res.clearCookie).toHaveBeenCalledWith("accessToken", {
        sameSite: "none",
        secure: true,
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.send).toHaveBeenCalledWith(
        "User has been logged out successfuly."
      );
    });
  });

    describe("Get Admin", () => {
        it("should get all admins", async () => {
        const admin_list = [
            {
            _id: "id",
            username: "admin",
            },
        ];
        Admin.find.mockResolvedValue(admin_list);
    
        await getAdmin(req, res);
    
        expect(Admin.find).toHaveBeenCalledWith({});
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(admin_list);
        });
    
        it("should return 500 if something went wrong", async () => {
        Admin.find.mockRejectedValue(new Error("error"));
    
        await getAdmin(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong");
        });
    });

});










