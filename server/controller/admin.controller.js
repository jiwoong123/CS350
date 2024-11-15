import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../prisma/prisma.js";

export const adminRegister = async (req, res) => {
  const { adminId, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newAdmin = await prisma.admin.create({
      data: {
        adminId,
        password: hashedPassword,
      },
    });
    console.log(newAdmin);

    res.status(201).json({ message: "Admin created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create new Admin" });
  }
};

export const adminLogin = async (req, res) => {
  const { adminId, password } = req.body;

  try {
    //check admin exist
    const admin = await prisma.admin.findUnique({
      where: { adminId },
    });

    if (!admin) return res.status(401).json({ message: "Admin not found" });

    //check admin password valid
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) return res.status(401).json({ menubar: "wrong password" });

    //authentic

    const age = 1000 * 60 * 60; //1h

    const token = jwt.sign(
      {
        id: admin.id,
        isAdmin: true,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: age }
    );
    res
      .cookie("testauth", token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json({ message: "Login successful" });
  } catch (err) {
    console.log(err);
  }
};
export const adminLogout = (req, res) => {
  res.clearCookie("testauth").status(200).json({ message: "logouted successfully" });
};
