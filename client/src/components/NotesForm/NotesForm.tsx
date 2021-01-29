import React, { useState } from "react";
import { Note } from "../../interfaces/interfaces";
import { createNote } from "../../services/notes";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@material-ui/core";
import "./NotesForm.scss";

interface Props {
  isOpened: boolean;
  setIsOpened: (isOpened: boolean) => void;
  setNotes: (notes: any) => void;
  setError: (error: string) => void;
}

const NotesForm: React.FC<Props> = ({ isOpened, setIsOpened, setNotes, setError }) => {
  const [noteValues, setNoteValues] = useState({
    title: "",
    description: ""
  });

  const addNote = async () => {
    const { title, description } = noteValues;

    if (title && description) {
      const res = await createNote(noteValues);

      if (res.success) {
        const { _id } = res.data;
        const newNote = { ...noteValues, _id, status: 0 };
        setNotes((prevNotes: Note[]) => [...prevNotes, newNote]);
      }

      closeForm();
    } else {
      setError("Please fill out form correctly");
    };
  };

  const closeForm = () => {
    setNoteValues({ title: "", description: "" });
    setIsOpened(false);
  };

  return (
    <Dialog className="notes-form" open={isOpened} onClose={closeForm} aria-labelledby="form-dialog-title">
      <DialogTitle className="title">Add Note</DialogTitle>
      <DialogContent>
        <TextField autoFocus margin="dense" label="Title" fullWidth onChange={(e) => setNoteValues({ ...noteValues, title: e.target.value })} />
        <TextField autoFocus margin="dense" label="Description" fullWidth onChange={(e) => setNoteValues({ ...noteValues, description: e.target.value })} />
      </DialogContent>
      <DialogActions className="actions">
        <Button onClick={addNote}>Save</Button>
        <Button onClick={closeForm}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default NotesForm;