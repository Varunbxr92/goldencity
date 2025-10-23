// Routes to map the API End points

const express = require("express");
const router = express.Router();
const noteController = require("../controllers/noteController");


router.get("/notes", noteController.getAllNotes);
router.get("/notes/:id", noteController.getNotesById);
router.post("/notes", noteController.createNote);
router.put("/notes/:id", noteController.updateNote);
router.delete("/notes/:id", noteController.deleteNote);

module.exports = router;