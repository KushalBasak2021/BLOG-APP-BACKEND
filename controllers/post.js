import User from "../models/User.js";
import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(200).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        res.status(200).json(updatedPost);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json("Post has been deleted");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(401).json("You can update only your posts");
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export const getPost = async (req, res, next) => {
  try {
    const getpost = await Post.findById(req.params.id);
    res.status(200).json(getpost);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  const username = req.query.user;
  const categoryname = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username });
    } else if (categoryname) {
      posts = await Post.find({
        categories: {
          $in: [categoryname],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json(posts);
  } catch (err) {
    next(err);
  }
};
