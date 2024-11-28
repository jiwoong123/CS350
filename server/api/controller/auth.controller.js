import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/prisma.js";

export const register = async (req, res) => {
  const { userId, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const newUser = await prisma.user.create({
      data: {
        userId,
        password: hashedPassword,
      },
    });
    console.log(newUser);

    res.status(201).json({ message: "User created successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to create new user" });
  }
};

export const login = async (req, res) => {
  const { userId, password } = req.body;

  try {
    //check user exist
    const user = await prisma.user.findUnique({
      where: { userId },
    });

    if (!user) return res.status(401).json({ message: "User not found" });

    //check user password valid
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) return res.status(401).json({ menubar: "wrong password" });

    //authentic

    const age = 1000 * 60 * 30; //30 minute

    const token = jwt.sign(
      {
        id: user.id,
        isUser: true,
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
export const logout = (req, res) => {
  res.clearCookie("testauth").status(200).json({ message: "logouted successfully" });
};
