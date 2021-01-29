import express from "express";
import { getAllNotes, createNote, toggleNoteStatus, deleteNote } from "../controllers/notes";

const notesRoutes = express.Router();

notesRoutes.get("/", getAllNotes);
notesRoutes.post("/", createNote);
notesRoutes.patch("/:id", toggleNoteStatus);
notesRoutes.delete("/:id", deleteNote);

export default notesRoutes;