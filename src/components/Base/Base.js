import React from "react";
import MenuBar from "../MenuBar/MenuBar";
import { Container } from "@material-ui/core";

function Base({ children }) {
  return (
    <div
      className="base"
      style={{ backgroundColor: "#eaf0f1", height: "100vh" }}
    >
      <MenuBar />
      <Container>{children}</Container>
    </div>
  );
}

export default Base;
