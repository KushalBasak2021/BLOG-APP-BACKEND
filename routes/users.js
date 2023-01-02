import express from "express";

import {
  deleteUser,
  //   getUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";

const router = express.Router();

// // UPDATE

router.put("/:id", updateUser);

// DELETE

router.delete("/:id", deleteUser);

// // GET(one specific)

router.get("/:id", getUser);

export default router;
