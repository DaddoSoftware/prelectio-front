import React, { useState } from "react";
import { TeamsSlider } from "../landing/teamsSliders";
import { Carousel, Row, Container } from "react-bootstrap";

export const CarouselTeams = () => {
  const [activeServiceCarousel, setActiveServiceCarousel] = useState(0);
  const handleSelect = (selectedIndex) => {
    setActiveServiceCarousel(selectedIndex);
  };

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images[index] = r(item);
    });
    return images;
  }
  const images = importAll(
    require.context(
      "../../../assets/home/equiposCarousel",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  return (
    <>
      <div className="aboutUs" id="news">
        <Container className="aboutUs__mainContainer">
          <Row className="aboutUs__mainContainer__topRow">
            <h1 className="text-center">Noticias</h1>
          </Row>
          <Carousel onSelect={handleSelect} activeIndex={activeServiceCarousel}>
            {images.map((item, i) => {
              return (
                <Carousel.Item key={item[i]}>
                  <TeamsSlider img={item} />
                </Carousel.Item>
              );
            })}
          </Carousel>
        </Container>
      </div>
    </>
  );
};
