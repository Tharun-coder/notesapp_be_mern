const {
  getNotes,
  createNote,
  getNote,
  deleteNote,
  updateNote,
} = require("../controllers/noteController");
const { protect } = require("../middlewares/auth.Middleware");

const router = require("express").Router();

router.get("/", protect, getNotes);

router.post("/create", protect, createNote);

router
  .route("/:id")
  .get(protect, getNote)
  .put(protect, updateNote)
  .delete(protect, deleteNote);

module.exports = router;
