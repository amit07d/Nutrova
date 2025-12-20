import { getAuth } from "@clerk/express";

export const requireAuth = (req, res, next) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({
      success: false,
      message: "Access denied. Please login to continue.",
    });
  }

  req.userId = userId;
  next();
};
