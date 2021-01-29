import mongoose from "mongoose";
import { Note as INote } from "../interfaces/interfaces";

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: Number, enum: [0, 1], required: true }
});

export default mongoose.model<INote>("Note", noteSchema);