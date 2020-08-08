import React, { useState, useEffect } from "react";
import "./Home.css";
import Base from "../Base/Base";
import { Grid, Typography } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import HomeHeader from "../HomeHeader/HomeHeader";
import { isAuthenticated } from "../../api/auth";
import { getAllNotes, deleteNote } from "../../api/note/noteApi";
import Note from "../Note/Note";
import { useStateValue } from "../../contextApi/StateProvider";

function Home() {
  const [notes, setNotes] = useState([]);
  const [error, setError] = useState("");
  const { user, token } = isAuthenticated();
  const [{ notesState }, dispatch] = useStateValue();
  const removeNote = (noteId) => {
    deleteNote(user._id, token, noteId)
      .then((data) => {
        if (data) {
          dispatch({ type: "REMOVE_NOTE", _id: data._id });
          alert(`${data.title} Deleted`);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllNotes(user._id, token)
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setNotes(data);
          dispatch({
            type: "SET_NOTES",
            notes: data,
          });
        }
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <Base>
      <div className="home">
        <HomeHeader />
        {notesState.length === 0 && (
          <div className="home__notecontainer">
            <Typography variant="h4">
              {" "}
              <NoteAddIcon fontSize="large" />
              Nothing to show
            </Typography>
          </div>
        )}

        <Grid container spacing={3}>
          {notesState.length > 0 &&
            notesState
              .map((note, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Note note={note} removeNote={removeNote} />
                </Grid>
              ))
              .reverse()}
        </Grid>
      </div>
    </Base>
  );
}

export default Home;
