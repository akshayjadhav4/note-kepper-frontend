import React from "react";
import "./MenuBar.css";
import { Link } from "react-router-dom";
import {
  AppBar,
  MenuItem,
  Toolbar,
  Typography,
  Button,
} from "@material-ui/core";
import { withRouter } from "react-router";

import { signout, isAuthenticated } from "../../api/auth/index";
function MenuBar({ history }) {
  return (
    <div className={`menuBar `}>
      <AppBar position="sticky" color="secondary">
        <Toolbar>
          <MenuItem>
            <Link to="/" className={`menuBar__link`}>
              <Typography variant="h6">Note Keeper</Typography>
            </Link>
          </MenuItem>

          {!isAuthenticated() && (
            <>
              <MenuItem>
                <Link to="/signin" className={`menuBar__link`}>
                  Sign In
                </Link>
              </MenuItem>

              <MenuItem>
                <Link to="/signup" className={`menuBar__link`}>
                  Sign Up
                </Link>
              </MenuItem>
            </>
          )}

          {isAuthenticated() && (
            <MenuItem>
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  signout(() => {
                    history.push("/signin");
                  });
                }}
              >
                Sign Out
              </Button>
            </MenuItem>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(MenuBar);
