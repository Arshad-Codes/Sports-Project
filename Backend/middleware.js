import Admin from "./models/admin.model.js";
import jwt from "jsonwebtoken";

export const verifyTokenAdmin = async (req, res, next) => {
  const token = req.cookies.accessToken;
  if (!token) return res.status(401).send('Access Denied');
  try {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, payload) => {
      if (err) return next(res.status(403).send("Token is not valid!"));
      const admin = await Admin.findOne({id:payload._id});
      if(!admin) return res.status(404).send("Unautorized Access");
      req.role="admin";
      next();
    });
  } catch (error) {
    next(error);
  }
}
