import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
const User = db.users;
import { createError } from "../utils/creatError.js";

//@desc register a new user
//@route POST /api/auth/register
//@access public
export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin: false,
    });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

//@desc login user
//@route POST /api/auth/login
//@access public

export const login = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(404, "User not found"));
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordValid) {
      return next(createError(401, "Incorrect password"));
    }

    const token = jwt.sign(
      { userId: user.id, isAdmin: user.isAdmin },
      process.env.JWT_KEY
    );
    const { password, ...info } = user?.dataValues;
    res
      .cookie("accessToken", token, {
        sameSite: "none",
        secure: true,
        expiresIn: "10d",
      })
      .status(200)
      .send(info);
  } catch (error) {
    next(error);
  }
};


//@desc logout user
//@route POST /api/auth/logout
//@access public

export const logout = (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("user has been logged out");
};
