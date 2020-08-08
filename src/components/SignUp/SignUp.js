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
import "./SignUp.css";
import { makeStyles } from "@material-ui/core/styles";
import { signup, isAuthenticated } from "../../api/auth";
import { Redirect, Link } from "react-router-dom";

const useStyles = makeStyles({
  card: {
    maxWidth: 450,
    marginTop: 40,
  },

  actions: {
    float: "right",
  },
  textField: { width: 400 },
  progress: {
    width: "100%",
  },
});

function SignUp() {
  const classes = useStyles();
  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().email("Inavalid email format").required("Required"),
    password: Yup.string()
      .min(6, "Min 6 character required")
      .required("Required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Password must match")
      .min(6, "Min 6 character required")
      .required("Required"),
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [process, setProcess] = useState(false);

  const onSubmit = (values, onSubmitProps) => {
    setProcess(true);

    const { firstName, lastName, email, password } = values;
    signup({ firstName, lastName, email, password })
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setSuccess("");
          setProcess(false);
        } else {
          setProcess(false);
          setError("");
          setSuccess("Account created");
        }
      })
      .catch((error) => console.log(error));
    onSubmitProps.setSubmitting(false);

    onSubmitProps.resetForm();
  };

  const performRedirect = () => {
    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  return (
    <Base>
      <div className="signUp">
        <Typography className="signUp__title" variant="h4">
          Create an account
        </Typography>
        {error && <Alert severity="error">{error}</Alert>}
        {success && (
          <Alert severity="success">
            {success}{" "}
            <Link to="/signin" className="signUp__link">
              Go to login Page{" "}
            </Link>
          </Alert>
        )}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ submitForm, isSubmitting }) => (
            <Form>
              {process && (
                <LinearProgress
                  className={classes.progress}
                  color="secondary"
                />
              )}
              <br />
              <Card className={classes.card}>
                <CardContent>
                  <Field
                    component={TextField}
                    name="firstName"
                    type="text"
                    label="First Name"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  />
                  <br />
                  <br />
                  <Field
                    component={TextField}
                    name="lastName"
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  />
                  <br />
                  <br />
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
                  <br />
                  <Field
                    component={TextField}
                    type="password"
                    label="Confirm Password"
                    name="confirmPassword"
                    variant="outlined"
                    color="secondary"
                    className={classes.textField}
                  />
                </CardContent>
                <CardActions className={classes.actions}>
                  <Button
                    variant="outlined"
                    color="secondary"
                    disabled={isSubmitting}
                    onClick={submitForm}
                  >
                    Submit
                  </Button>
                </CardActions>
              </Card>
            </Form>
          )}
        </Formik>
        {performRedirect()}
      </div>
    </Base>
  );
}

export default SignUp;
