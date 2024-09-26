import React from "react";
import { Container } from "react-bootstrap";

export const TeamsSlider = (props) => {
  return (
    <div className="serviceSlider my-4">
      <Container>
        <img alt={""} className="w-50 h-50 m-auto" src={props.img}></img>
      </Container>
    </div>
  );
};
