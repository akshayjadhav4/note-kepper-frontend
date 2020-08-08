import React, { useState } from "react";
import Base from "../Base/Base";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import {
  Button,
  LinearProgress,
  Typography,
  Card,
  CardContent,
  CardActions,
} from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { TextField } from "formik-material-ui";
import "./SignIn.css";
import { makeStyles } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../../api/auth";
const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    marginTop: 40,
  },

  actions: {
    float: "right",
  },
  textField: { width: 400 },
});

function SignIn() {
  const classes = useStyles();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Inavalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Min 6 character required")
      .required("Required"),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { user } = isAuthenticated();
  const [process, setProcess] = useState(false);
  const onSubmit = (values, onSubmitProps) => {
    setProcess(true);
    const { email, password } = values;
    signin({ email, password })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess("");
          setProcess(false);
        } else {
          authenticate(data, () => {
            setProcess(false);
            setError("");
            setSuccess("Login Successful");
            setRedirect(true);
          });
        }
      })
      .catch((error) => console.log(error));
    onSubmitProps.setSubmitting(false);

    onSubmitProps.resetForm();
  };

  const performRedirect = () => {
    if (redirect) {
      if (user) {
        return <Redirect to="/" />;
      }
    }
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };

  return (
    <Base>
      <div className="signIn">
        <Typography className="signIn__title" variant="h4">
          Sign In
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              {process && <LinearProgress color="secondary" />}
              <br />
              <Card className={classes.card}>
                <CardContent>
                  <Field
                    component={TextField}
                    name="email"
                    type="email"
                    label="Email"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  />
                  <br />
                  <br />
                  <Field
                    component={TextField}
                    type="password"
                    label="Password"
                    name="password"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  />
                  <br />
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Log In
                  </Button>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
      {performRedirect()}
    </Base>
  );
}

export default SignIn;
