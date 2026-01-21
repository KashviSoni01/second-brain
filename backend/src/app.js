const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")

const {createUser, login} = require("./controllers/authController")
const {createPost, seePost, deletePost} = require("./controllers/postController")
const authMiddleware = require("./middlewares/authMiddleware")
const app = express()
app.use(express.json())
app.use(
  session({
    secret: "second-brain-secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false // true only when using HTTPS
    }
  })
);

mongoose.connect("mongodb://127.0.0.1:27017/second-brain")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error", err);
  });

  //user sign up's
  app.post("/api/auth/signup", createUser) 

  // user logins
  app.post("/api/auth/login", login) 

  // user creates a post
  app.post("/api/post", authMiddleware, createPost)

  //user's all post
  app.get("/api/post", authMiddleware, seePost)

  //delete a post
  app.delete("/api/post/:postId", authMiddleware, deletePost)
  app.listen(3000);