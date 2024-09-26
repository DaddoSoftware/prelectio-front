import React from "react";
import { Container, Row } from "react-bootstrap";
export const AboutUs = () => {
  return (
    <div className="aboutUs" id="aboutUs">
      <Container className="aboutUs__mainContainer">
        <Row className="aboutUs__mainContainer__topRow">
          <h1 className="text-center">¿Qué es Prelectio?</h1>
        </Row>
        <Row className="aboutUs__mainContainer__bottomRow">
          <h2>
            Prelectio fue creado para revolucionar la búsqueda de talentos
            deportivos, facilitando y agilizando los procesos de selección y
            captación de futuros deportistas aprovechando el desarrollo
            tecnológico. Además, busca fomentar el crecimiento social y la
            igualdad de oportunidades en el mundo deportivo, permitiendo que
            personas de diferentes orígenes y circunstancias tengan acceso a las
            mismas oportunidades de éxito.
          </h2>
        </Row>
      </Container>
    </div>
  );
};
