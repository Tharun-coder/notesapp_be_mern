const Note = require("../models/noteModel");
const asyncHandler = require("express-async-handler");

const getNotes = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const notes = await Note.find({ user: _id }).lean();
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error("Please enter valid inputs");
  }

  const note = await Note.create({
    title,
    category,
    content,
    user: req.user._id,
  });

  res.status(201).json(note);
});

const getNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findById(id);

  if (!note) {
    res.status(400);
    throw new Error("Note not found!!!");
  }

  res.status(201).json(note);
});

const updateNote = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  const note = await Note.findOneAndUpdate(
    { _id: id },
    { $set: { title, content, category } },
    { new: true }
  );

  if (!note) {
    res.status(400);
    throw new Error("Note not found!!!");
  }

  res.status(201).json(note);
});

const deleteNote = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const note = await Note.findOneAndDelete({ _id: id });

  if (!note) {
    res.status(400);
    throw new Error("Note not found!!!");
  }

  res.status(201).json("Note deleted successfully");
});

module.exports = { getNotes, createNote, getNote, updateNote, deleteNote };
