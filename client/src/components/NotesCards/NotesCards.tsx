import React from "react";
import { Note } from "../../interfaces/interfaces";
import { Grid, Card, CardActions, CardContent, Typography, FormControlLabel, Checkbox, Button } from "@material-ui/core";
import { toggleNoteStatus, deleteNote } from "../../services/notes";
import "./NotesCards.scss";

interface Props {
  notes: Note[];
  setNotes: (notes: Note[]) => void;
}

const NotesCards: React.FC<Props> = ({ notes, setNotes }) => {
  const toggleStatus = async (id: string, index: number) => {
    const res = await toggleNoteStatus(id);

    if (res.success) {
      const newArr = [...notes];
      newArr[index].status = newArr[index].status === 0 ? 1 : 0;
      setNotes(newArr);
    }
  };

  const isCompleted = (index: number) => notes[index].status === 1;

  const removeNote = async (id: string, index: number) => {
    const res = await deleteNote(id);

    if (res.success) {
      const newArr = [...notes];
      newArr.splice(index, 1);
      setNotes(newArr);
    }
  };

  return (
    <Grid className="notes-cards" container justify="center" spacing={2}>
      {notes.map((note: Note, index: number) => (
        <Grid key={index} item xs={10} sm={8} md={6} className="note">
          <Card className={"card " + (isCompleted(index) && "is-completed")} elevation={6}>
            <CardContent className="card-content">
              <Typography>{note.title}</Typography>
              <Typography className="note-description"> {note.description}</Typography>
            </CardContent>
            <CardActions className="card-actions">
              <FormControlLabel
                control={
                  <Checkbox
                    color="primary"
                    checked={isCompleted(index)}
                    onChange={() => note._id && toggleStatus(note._id, index)}
                    inputProps={{ "aria-label": "checkbox" }}
                  />}
                label={isCompleted(index) ? "undone" : "done"}
              />
              <Button onClick={() => note._id && removeNote(note._id, index)}>Delete Note</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default NotesCards;