import React, { useState } from "react";
import "./HomeHeader.css";
import { isAuthenticated } from "../../api/auth";
import { Typography, Button } from "@material-ui/core";
import NoteAddIcon from "@material-ui/icons/NoteAdd";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import { makeStyles } from "@material-ui/core/styles";
import { createNote } from "../../api/note/noteApi";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";
import { useStateValue } from "../../contextApi/StateProvider";
const useStyles = makeStyles((theme) => ({
  textField: { width: 300 },
}));
function HomeHeader() {
  const classes = useStyles();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [{ notesState }, dispatch] = useStateValue();
  const { user, token } = isAuthenticated();
  const initialValues = {
    title: "",
    description: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const onSubmit = (values, onSubmitProps) => {
    const note = {
      title: values.title,
      description: values.description,
      author: user._id,
    };

    createNote(user._id, token, note).then((data) => {
      if (data.error) {
        setError(data.error);
        setSuccess("");
      } else {
        setError("");
        setSuccess("Note Added");
        dispatch({
          type: "ADD_NOTE",
          item: data,
        });

        setTimeout(() => {
          setError("");
          setSuccess("");
        }, 3000);
      }
    });
    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };

  return (
    <div className="homeHeader">
      <Typography variant="h5" className="homeHeader__userName">
        Welcome, {user.firstName} {user.lastName}{" "}
      </Typography>
      <div className="homeHeader__addNoteDiv">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form className="homeHeader__addNote">
              <Field
                component={TextField}
                name="title"
                type="text"
                label="Title"
                color="secondary"
                className={classes.textField}
              />

              <Field
                id="standard-multiline-flexible"
                component={TextField}
                type="text"
                label="Description"
                name="description"
                color="secondary"
                rowsMax={4}
                multiline
                className={classes.textField}
              />
              {success && (
                <DoneOutlineIcon className="homeHeader__IconSuccess" />
              )}
              {error && <ErrorOutlineIcon className="homeHeader__IconError" />}
              <Button
                variant="outlined"
                color="secondary"
                disabled={isSubmitting}
                onClick={submitForm}
                startIcon={<NoteAddIcon />}
              >
                Add
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default HomeHeader;
