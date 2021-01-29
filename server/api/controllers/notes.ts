import { Request, Response, NextFunction } from "express";
import Note from "../models/note";
import messages from "../utils/messages";
const { fillCorrectlyMsg, validIdMsg, notFoundMsg } = messages;

const getAllNotes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const notes = await Note.find({});
    return res.status(200).json(notes);
  } catch (err) {
    next(err);
  }
};

const createNote = async (req: Request, res: Response, next: NextFunction) => {
  const { title, description } = req.body;
  const note = { title, description };

  if (title && description) {
    try {
      const newNote = await Note.create({ ...note, status: 0 });
      await newNote.save();
      return res.status(201).json({ _id: newNote._id });
    } catch (err) {
      next(err);
    }
  } else {
    next(fillCorrectlyMsg);
  }
};

const toggleNoteStatus = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id) {
    try {
      const note = await Note.findOne({ _id: id });

      if (note) {
        await Note.updateOne({ _id: id }, { status: note.status === 0 ? 1 : 0 });
        res.status(200).json({ message: "Status updated successfully" });
      } else {
        next(`Note ${notFoundMsg}`);
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(validIdMsg);
  }
};

const deleteNote = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  if (id) {
    try {
      const note = await Note.findOne({ _id: id });

      if (note) {
        await Note.deleteOne({ _id: id });
        res.status(200).json({ message: "Note deleted successfully" });
      } else {
        next(`Note ${notFoundMsg}`);
      }
    } catch (err) {
      next(err);
    }
  } else {
    next(validIdMsg);
  }
};

export { getAllNotes, createNote, toggleNoteStatus, deleteNote };