import db from "../models/index.js";
import { createError } from "../utils/creatError.js";
const User = db.users;

//@desc get all users
//@route GET /api/user/
//@access private

export const getUsers = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(403, "Access denied: Admin privileges required");
  }
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

//@desc get a user
//@route GET /api/user/:id
//@access private

export const getUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(403, "Access denied: Admin privileges required");
  }
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

//@desc DELETE a user
//@route GET /api/user/:id
//@access private

export const deleteUser = async (req, res, next) => {
  if (!req.isAdmin) {
    return next(403, "Access denied: Admin privileges required");
  }
  const { id } = req.params;
  try {
    const user = await User.findByPk(id);
    if (!user) {
      return next(createError(400, "User not found"));
    }
    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};
