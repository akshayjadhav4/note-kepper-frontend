import React from "react";
import { Card, CardActions } from "@material-ui/core";
import "./Note.css";
import moment from "moment";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateDialog from "../UpdateDialog/UpdateDialog";
function Note({ note, removeNote }) {
  return (
    <div className={` note`}>
      <Card className="note_content">
        <h2>{note.title}</h2>
        <h4>{note.description}</h4>
        <p>{moment(note.createdAt).format("dddd, MMMM Do YYYY, h:mm:ss a")}</p>
        <CardActions>
          <DeleteIcon
            style={{ color: "red" }}
            onClick={() => {
              removeNote(note._id);
            }}
          />

          <UpdateDialog note={note} />
        </CardActions>
      </Card>
    </div>
  );
}

export default Note;
