import React, { useState } from "react";
import { TeamsSlider } from "../landing/teamsSliders";
import { Carousel, Row, Container, Col } from "react-bootstrap";

export const CarouselTeams = () => {
  const [activeNoticiasCarousel, setActiveNoticiasCarousel] = useState(0);
  const [activeResultadosCarousel, setActiveResultadosCarousel] = useState(0);

  const handleSelect = (selectedIndex) => {
    setActiveNoticiasCarousel(selectedIndex);
  };
  const handleResultadoSelect = (selectedIndex) => {
    setActiveResultadosCarousel(selectedIndex);
  };

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images[index] = r(item);
    });
    return images;
  }

  const noticias = importAll(
    require.context(
      "../../../assets/home/equiposCarousel",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );
  const resultados = importAll(
    require.context(
      "../../../assets/home/resultados",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  return (
    <>
      <div className="aboutUs" id="news">
        <Container className="aboutUs__mainContainer">
          <Row className="d-flex align-items-center">
            <Col lg={6} md={12} className="mb-4">
              <h1 className="text-center">Noticias</h1>
              <Carousel
                variant="dark"
                onSelect={handleSelect}
                activeIndex={activeNoticiasCarousel}
              >
                {noticias.map((item, i) => (
                  <Carousel.Item key={i}>
                    <TeamsSlider img={item} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>

            <Col lg={6} md={12} className="mb-4">
              <h1 className="text-center">Resultados</h1>
              <Carousel
                variant="dark"
                onSelect={handleResultadoSelect}
                activeIndex={activeResultadosCarousel}
              >
                {resultados.map((item, i) => (
                  <Carousel.Item key={i}>
                    <TeamsSlider img={item} />
                  </Carousel.Item>
                ))}
              </Carousel>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
};
