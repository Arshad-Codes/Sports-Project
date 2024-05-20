import Sport from "../../models/sports.model";
import { createsport, getSports, deleteSport, addTeamMembers } from "../../controllers/sports.controller";


jest.mock("../../models/sports.model");

describe("createsport", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      role: "admin",
      body: {
        name: "Football",
        team: []
      }
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn()
    };
  });

  test("should return 201 if sport is created", async () => {
    await createsport(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Sport has been created.");
  });

  test("should return 403 if role is not admin", async () => {
    req.role = "user";

    await createsport(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Unautorized Access. You are not a admin");
  });

});

describe("getSports", () => {
    let req;
    let res;
    
    beforeEach(() => {
        req = {};
        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        };
    });
    
    test("should return 200 and list of sports", async () => {
        Sport.find.mockResolvedValue([{ name: "Football" }]);
    
        await getSports(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ name: "Football" }]);
    });
    
    test("should return 500 if something went wrong", async () => {
        Sport.find.mockRejectedValue(new Error("Something went wrong"));
    
        await getSports(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong");
    });
    
});

describe("deleteSport", () => {
    let req;
    let res;
    
    beforeEach(() => {
        req = {
        role: "admin",
        params: {
            id: "1"
        }
        };
        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        };
    });
    

    
    test("should return 404 if sport is not found", async () => {
        Sport.findByIdAndDelete.mockResolvedValue(null);
    
        await deleteSport(req, res);
    
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith("Something went wrong" );
    });
    
    test("should return 403 if role is not admin", async () => {
        req.role = "user";
    
        await deleteSport(req, res);
    
        expect(res.status).toHaveBeenCalledWith(403);
        expect(res.send).toHaveBeenCalledWith("Unautorized Access. You are not a admin");
    });
    
    test("should return 500 if something went wrong", async () => {
        Sport.findByIdAndDelete.mockRejectedValue(new Error("Something went wrong"));
    
        await deleteSport(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong");
    });
    
});
