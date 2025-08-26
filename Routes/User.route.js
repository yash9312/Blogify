const { Router } = require("express");
const User = require("../Models/User.model.js");

const router = Router();

// Render signup page
router.get("/signup", (req, res) => {
  return res.render("Signup");
});

// Handle user signup
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    await User.create({ fullName, email, password });
    return res.redirect("/");
  } catch (error) {
    console.error("Signup error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Render signin page
router.get("/signin", (req, res) => {
  return res.render("Signin");
});

// Handle user signin
router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("token", token).redirect("/");
  } catch (error) {
    console.error("Signin error:", error.message);
    return res.render("Signin", {
      error: "Incorrect Email or Password"
    });
  }
});

// Logout route
router.get("/logout",(req, res) => {
  res.clearCookie("token").redirect("/")
});

module.exports = router;
