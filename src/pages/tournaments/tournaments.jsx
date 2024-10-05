import React, { useState } from "react";
import { Container, Row, Button, Col } from "react-bootstrap";
import { CarouselTournaments } from "./carouseltournaments";

export const Tournaments = () => {
  const [activeTournament, setActiveTournament] = useState("sub20");

  return (
    <>
      <div className="aboutUs" id="aboutUs">
        <Container className="aboutUs__mainContainer">
          <Row className="aboutUs__mainContainer__topRow mb-5">
            <h1 className="text-center">Torneos</h1>
          </Row>
          <Row className="justify-content-center my-4">
            <Col className="text-center">
              <Button
                variant="dark"
                size="lg"
                className="px-4"
                onClick={() => setActiveTournament("sub20")}
              >
                Sub 20
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                variant="dark"
                size="lg"
                className="px-4"
                onClick={() => setActiveTournament("sub17")}
              >
                Sub 17
              </Button>
            </Col>
            <Col className="text-center">
              <Button
                variant="dark"
                size="lg"
                className="px-4"
                onClick={() => setActiveTournament("sub15")}
              >
                Sub 15
              </Button>
            </Col>
          </Row>
          <Row className="aboutUs__mainContainer__bottomRow">
            {activeTournament === "sub20" && <CarouselTournaments sub20 />}
            {activeTournament === "sub17" && <CarouselTournaments sub17 />}
            {activeTournament === "sub15" && <CarouselTournaments sub15 />}
          </Row>
        </Container>
      </div>
    </>
  );
};
