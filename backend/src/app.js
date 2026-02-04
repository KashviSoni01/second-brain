const express = require("express")
const mongoose = require("mongoose")
const session = require("express-session")
const cors = require("cors")
require("dotenv").config()

const { createUser, login } = require("./controllers/authController")
const { createPost, seePost, deletePost } = require("./controllers/postController")
const authMiddleware = require("./middlewares/authMiddleware")
const app = express()

app.use(cors({
  origin: true,
  credentials: true
}))



app.use(express.json())

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: "lax",   
      secure: false       
    }
  })
);

mongoose.connect(process.env.MONGO_URI)
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

//user log's out
app.post("/api/auth/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out" })
  })
})

// user creates a post
app.post("/api/post", authMiddleware, createPost)

//user's all post
app.get("/api/post", authMiddleware, seePost)

//delete a post
app.delete("/api/post/:postId", authMiddleware, deletePost)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
