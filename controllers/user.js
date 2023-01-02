import User from "../models/User.js";
import Post from "../models/Post.js";

import bcrypt from "bcrypt";

export const updateUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    try {
      const updateduser = await User.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );

      res.status(200).json(updateduser);
    } catch (err) {
      next(err);
    }
  } else {
    res.status(401).json("You can update only your account");
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.body.userId === req.params.id) {
    try {
      const user = await User.findById(req.params.id);
      try {
        await Post.deleteMany({ username: user.username });
        await User.findByIdAndDelete(req.params.id);

        res.status(200).json("Your account has been deleted");
      } catch (err) {
        next(err);
      }
    } catch (err) {
      res.status(404).json("User not found");
    }
  } else {
    res.status(401).json("You can delete only your account");
  }
};

export const getUser = async (req, res, next) => {
  try {
    const getuser = await User.findById(req.params.id);
    const { password, ...others } = getuser._doc;
    res.status(200).json(others);
  } catch (err) {
    next(err);
  }
};
