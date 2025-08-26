const dotenv = require("dotenv").config();
const path = require("path");
const express = require("express");
const { Connected } = require("./Config/Connection.js");
const blog = require("./Models/Blog.model.js");
const user_router = require("./Routes/User.route.js");
const blog_router = require("./Routes/Blog.route.js");
let cookieParser = require("cookie-parser");
const {
  checkForAuthenticationCookie,
} = require("./Middlewares/Authentication.js");

const app = express();
const port = process.env.PORT;

// Connect to MongoDB
Connected(process.env.MONGO_URL);

app.set("view engine", "ejs");
app.set("views", path.resolve("./Views"));

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")));

// Home route
app.get("/", async (req, res) => {
  const allblog = await blog.find({});
  res.render("Home", {
    user: req.user,
    blogs: allblog
  });
});

// Register routes
app.use("/user", user_router);
app.use("/blog", blog_router);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running at: http://localhost:${port}`);
});
