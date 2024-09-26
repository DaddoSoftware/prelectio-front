import React, { useState } from "react";
import { TeamsSlider } from "../landing/teamsSliders";
import { Carousel, Row } from "react-bootstrap";

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
      <Row className="services__mainContainer__ServicesCarouselRow">
        <Carousel onSelect={handleSelect} activeIndex={activeServiceCarousel}>
          {images.map((item) => {
            return (
              <Carousel.Item>
                <TeamsSlider img={item} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </Row>
    </>
  );
};
