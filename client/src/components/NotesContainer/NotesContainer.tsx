import React, { useEffect, useState } from "react";
import { getAllNotes } from "../../services/notes";
import { Button, Typography } from "@material-ui/core";
import NotesCards from "../NotesCards/NotesCards";
import NotesForm from "../NotesForm/NotesForm";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import "./NotesContainer.scss";

const NotesContainer = () => {
  const [notes, setNotes] = useState<any>([]);
  const [isFormOpened, setIsFormOpened] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const res = await getAllNotes();

      if (res.success) {
        setNotes(res.data);
      } else {
        setError("Something went wrong...");
      }
    };

    getNotes();
  }, []);

  return (
    <div className="notes-container">
      <Typography component="h1">Notes App</Typography>
      <Button className="add-note" onClick={() => setIsFormOpened(true)}>Add Note</Button>
      <NotesForm isOpened={isFormOpened} setIsOpened={setIsFormOpened} setNotes={setNotes} setError={setError} />
      <NotesCards notes={notes} setNotes={setNotes} />
      <ErrorMessage error={error} setError={setError} />
    </div>
  );
};

export default NotesContainer;