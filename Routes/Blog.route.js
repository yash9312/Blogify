const { Router } = require("express");
const Blog = require("../Models/Blog.model");
const Comment = require("../Models/Comment.model");
const path = require("path");
const multer = require("multer");

const router = Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/Uploads/`));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

// Handle blog creation
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body } = req.body;

  try {
    const blog = await Blog.create({
      title,
      body,
      createdBy: req.user.id,
      coverImage: `/Uploads/${req.file.filename}`,
    });

    return res.redirect("/");
  } catch (error) {
    console.error("Blog creation error:", error.message);
    return res.status(500).send("Internal Server Error");
  }
});

// Render add blog page
router.get("/add", (req, res) => {
  return res.render("Add-Blog", {
    user: req.user,
  });
});

// Render single blog post with comments
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const comment = await Comment.find({ blogId: req.params.id }).populate("createdBy");

  console.log(comment);

  return res.render("Blog", {
    user: req.user,
    blog,
    comment,
  });
});

// Add comment to blog
router.post("/comment/:blogId", async (req, res) => {
  await Comment.create({
    content: req.body.content,
    blogId: req.params.blogId,
    createdBy: req.user.id,
  });

  return res.redirect(`/blog/${req.params.blogId}`);
});

module.exports = router;
