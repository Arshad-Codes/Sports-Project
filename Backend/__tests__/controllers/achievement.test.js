import Achievement from "../../models/achievements.model";
import { createAchievement, getAchievements, deleteAchievement } from "../../controllers/achievements.controller";

jest.mock("../../models/achievements.model");

describe("createAchievement", () => {
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

  test("should return 201 if achievement is created", async () => {
    const sampleAchievement = {
      _id: "sampleId",
      title: "sampleTitle",
      description: "sampleDescription",
        imgUrl: "sampleUrl",
    };
    const mockSavedAchievement = jest.fn().mockResolvedValue(sampleAchievement);
    Achievement.mockImplementation(() => ({
      save: mockSavedAchievement,
    }));

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    await createAchievement(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(sampleAchievement);
  });

  test("should return 403 if role is not admin", async () => {
    req.role = "user";

    await createAchievement(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.send).toHaveBeenCalledWith("Unautorized Access. You are not a admin");
  });

});

describe("getAchievements", () => {
    let req;
    let res;
    
    beforeEach(() => {
        req = {};
        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        };
    });
    
    test("should return 200 and list of achievements", async () => {
        Achievement.find.mockResolvedValue([{ title: "sampleTitle" }]);
    
        await getAchievements(req, res);
    
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([{ title: "sampleTitle" }]);
    });
    
    test("should return 500 if error", async () => {
        Achievement.find.mockRejectedValue("Error");
    
        await getAchievements(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong");
    });
});

describe("deleteAchievement", () => {
    let req;
    let res;
    
    beforeEach(() => {
        req = {
            params: {
                id: "sampleId",
                title: "sampleTitle"
            },
            role: "admin"
        };
        res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
        };
    });
    
    test("should return 500 if error", async () => {
        Achievement.findByIdAndDelete.mockRejectedValue("Error");
    
        await deleteAchievement(req, res);
    
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith("Something went wrong");
    });
});