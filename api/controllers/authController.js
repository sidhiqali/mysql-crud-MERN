import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models"; // Assuming your User model is imported here
import { createError } from "../utils/creatError";

export const register = async (req, res,next) => {
  const { username, email, password, isAdmin } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      isAdmin:false,
    });

    res.json({ message: "User registered successfully", user });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(createError(404, "User not found"))
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(createError(401, "Invalid credentials"))
    }

    const token = jwt.sign({ userId: user.id,isAdmin:user.isAdmin }, process.env.JWT_KEY,);
    const { password, ...info } = user?._doc;
    res.cookie('accessToken',token,{
        sameSite:'none',
        secure:true,
    expiresIn: '10d',
    }).status(200).send(info)
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};

export const logout = (req, res) => {
  // You can clear any cookies or tokens here, if needed
  res.json({ message: "Logout successful" });
};
