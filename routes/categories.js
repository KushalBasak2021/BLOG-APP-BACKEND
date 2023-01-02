import express from "express";

import { createCategory, getCategories } from "../controllers/category.js";

const router = express.Router();

//  CREATE POST

router.post("/", createCategory);

// // GETALL

router.get("/", getCategories);

export default router;
