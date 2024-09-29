import React from "react";
import { Container, Row } from "react-bootstrap";
import { CarouselTournaments } from "./carouseltournaments";

export const Tournaments = () => {
  return (
    <>
      <div className="aboutUs" id="aboutUs">
        <Container className="aboutUs__mainContainer">
          <Row className="aboutUs__mainContainer__topRow mb-5">
            <h1 className="text-center">Torneos</h1>
          </Row>
          <Row className="aboutUs__mainContainer__bottomRow">
            <CarouselTournaments sub20 />
            <CarouselTournaments sub17 />
            <CarouselTournaments sub15 />
          </Row>
        </Container>
      </div>
    </>
  );
};
