import express from "express";

import {
  deletePost,
  getPost,
  updatePost,
  createPost,
  getPosts,
} from "../controllers/post.js";

const router = express.Router();

//  CREATE POST

router.post("/", createPost);

// // UPDATE

router.put("/:id", updatePost);

// DELETE

router.delete("/:id", deletePost);

// // GET(one specific)

router.get("/:id", getPost);

// // GETALL

router.get("/", getPosts);

export default router;
