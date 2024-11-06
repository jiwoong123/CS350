import jwt from "jsonwebtoken";

export const gymGoerLoggedIn = async (req, res, next) => {
  const token = req.cookies.testauth;

  //not logged in
  if (!token) return res.status(401).json({ message: "You should log in first" });

  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Wrong token" });
    if (!payload.isUser) return res.status(403).json({ message: "You are not user" });
    req.userId = payload.id;
    next();
  });
};

export const AdminLoggedIn = async (req, res, next) => {
  const token = req.cookies.testauth;

  //not logged in
  if (!token) return res.status(401).json({ message: "You should log in first" });

  jwt.verify(token, process.env.JWT_SECRETKEY, async (err, payload) => {
    if (err) return res.status(403).json({ message: "Wrong token" });
    if (!payload.isAdmin) return res.status(403).json({ message: "You are not admin" });
    req.adminId = payload.id;
    next();
  });
  res.status(400).json({ message: "wrong" });
};
