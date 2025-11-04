// noteController.js

const asyncErrorHandler = require("../middlewares/helpers/asyncErrorHandler");
const ErrorHandler = require("../utils/errorHandler");

const notes = [];
let serialId = 1;

/**
 * Helper to find a note by ID
 */
const findNoteById = (id) => notes.find((note) => note.id === id);

/**
 * Helper to validate the note ID parameter
 */
const getValidatedNoteId = (param, next) => {
  const id = Number(param);

  if (!Number.isInteger(id) || id <= 0) {
    return next(new ErrorHandler("Invalid Note ID", 400));
  }

  return id;
};

// Create Note
exports.createNote = asyncErrorHandler(async (req, res, next) => {
  const { title, content } = req.body;

  if (title === null || content === null) {
    return next(
      new ErrorHandler("Title and Content cannot be null", 400)
    );
  }

  if (!title || !content) {
    return next(
      new ErrorHandler("Title and Content are required fields.", 400)
    );
  }

  const note = { id: serialId++, title, content };
  notes.push(note);

  res.status(201).json({
    success: true,
    note,
  });
});

// Get All Notes
exports.getAllNotes = asyncErrorHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    notes,
  });
});

// Get Note Details
exports.getNoteById = asyncErrorHandler(async (req, res, next) => {
  const noteId = getValidatedNoteId(req.params.id, next);
  if (!noteId) return;

  const note = findNoteById(noteId);

  if (!note) {
    return next(
      new ErrorHandler(`Note not found with ID: ${noteId}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    note,
  });
});

// Update Note
exports.updateNote = asyncErrorHandler(async (req, res, next) => {
  const noteId = getValidatedNoteId(req.params.id, next);
  if (!noteId) return;

  const note = findNoteById(noteId);

  if (!note) {
    return next(
      new ErrorHandler(`Note not found with ID: ${noteId}`, 404)
    );
  }

  const { title, content } = req.body;

  if (!title || !content) {
    return next(
      new ErrorHandler("Title and Content are required fields.", 400)
    );
  }

  note.title = title;
  note.content = content;

  res.status(200).json({
    success: true,
    note,
  });
});

// Delete Note
exports.deleteNote = asyncErrorHandler(async (req, res, next) => {
  const noteId = getValidatedNoteId(req.params.id, next);
  if (!noteId) return;

  const noteIndex = notes.findIndex((note) => note.id === noteId);

  if (noteIndex === -1) {
    return next(
      new ErrorHandler(`Note not found with ID: ${noteId}`, 404)
    );
  }

  notes.splice(noteIndex, 1);

  res.status(200).json({
    success: true,
  });
});