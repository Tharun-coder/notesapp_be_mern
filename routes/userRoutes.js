const {
  registerUser,
  authUser,
  updateUserProfile,
} = require("../controllers/userController");
const { protect } = require("../middlewares/auth.Middleware");

const router = require("express").Router();

router.post("/", registerUser);
router.post("/login", authUser);
router.post("/profile", protect, updateUserProfile);

module.exports = router;
