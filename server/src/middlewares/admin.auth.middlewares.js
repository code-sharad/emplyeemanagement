import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

import { JWT_SECRET } from "../constant.js";

const isAdminLoggedIn = asyncHandler(async (req, res, next) => {
  // const adminToken = req.cookies ? req.cookies.adminToken : undefined;
  console.log("frontend cookies => ", req.cookies);

  const adminToken =
    req.cookies?.adminToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!adminToken) {
    return res
      .status(200)
      .redirect(process.env.CLIENT_DOMAIN)
      .json(new ApiResponse(400, "admin is not login in the server"));
  }

  try {
    const decoded = jwt.verify(adminToken, JWT_SECRET);

    req.user = decoded;

    console.log(req.user);
    console.log("hello world");
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
});

export { isAdminLoggedIn };
