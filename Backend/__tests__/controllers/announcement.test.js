import Announcement from "../../models/announcement.model"
import Sport from "../../models/sports.model";
import { createAnnouncement } from "../../controllers/announcement.controller";

jest.mock("../../models/announcement.model");
jest.mock("../../models/sports.model");

describe("createAnnouncement", () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      body: {
        title: "sampleTitle",
        description: "sampleDescription",
        imgUrl: "sampleUrl",
        sport: "sampleSportId",
      },
    };
    res = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
  });

  test("should return 201 if announcement is created", async () => {
    const sampleAnnouncement = {
      _id: "sampleId",
      title: "sampleTitle",
      description: "sampleDescription",
      imgUrl: "sampleUrl",
      sport: "sampleSportId",
    };
    const mockSavedAnnouncement = jest.fn().mockResolvedValue(sampleAnnouncement);
    Announcement.mockImplementation(() => ({
      save: mockSavedAnnouncement,
    }));

    await createAnnouncement(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.send).toHaveBeenCalledWith("Announcement has been created.");
  });

  test("should return 500 if error occurs", async () => {
    const mockSavedAnnouncement = jest.fn().mockRejectedValue(new Error("error"));
    Announcement.mockImplementation(() => ({
      save: mockSavedAnnouncement,
    }));

    await createAnnouncement(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.send).toHaveBeenCalledWith("something went wrong");
  });
}
);


