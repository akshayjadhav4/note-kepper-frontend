import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import EditIcon from "@material-ui/icons/Edit";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { TextField } from "formik-material-ui";
import SaveIcon from "@material-ui/icons/Save";
import { makeStyles } from "@material-ui/core/styles";
import { updateNote } from "../../api/note/noteApi";
import { isAuthenticated } from "../../api/auth";
import { useStateValue } from "../../contextApi/StateProvider";

const useStyles = makeStyles((theme) => ({
  textField: { width: 300 },
}));

function UpdateDialog({ note }) {
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const [{ notesState }, dispatch] = useStateValue();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const initialValues = {
    title: note.title,
    description: note.description,
    noteId: note._id,
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  });

  const [error, setError] = useState("");

  const { user, token } = isAuthenticated();
  const onSubmit = (values, onSubmitProps) => {
    const note = {
      title: values.title,
      description: values.description,
      author: user._id,
    };
    updateNote(user._id, token, values.noteId, note).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setError("");
        setOpen(false);
        dispatch({
          type: "UPDATE_NOTE",
          data: data,
        });
      }
    });

    onSubmitProps.setSubmitting(false);
    onSubmitProps.resetForm();
  };
  return (
    <div className="updateDialog">
      <EditIcon onClick={handleClickOpen} style={{ color: "green" }} />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Update Note</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            enableReinitialize
          >
            {({ submitForm, isSubmitting }) => (
              <Form>
                {error && <p style={{ color: "red" }}>{error}</p>}
                <Field
                  component={TextField}
                  name="title"
                  type="text"
                  label="Title"
                  color="secondary"
                  className={classes.textField}
                />

                <br />
                <br />
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
                <br />
                <br />
                <Button
                  color="secondary"
                  disabled={isSubmitting}
                  onClick={submitForm}
                  startIcon={<SaveIcon />}
                >
                  Save
                </Button>
              </Form>
            )}
          </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UpdateDialog;
