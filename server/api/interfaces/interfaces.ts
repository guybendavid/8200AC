import mongoose from "mongoose";

export interface Note extends mongoose.Document {
  title: string;
  description: string;
  status: number;
}