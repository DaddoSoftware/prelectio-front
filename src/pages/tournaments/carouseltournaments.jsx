import React, { useState } from "react";
import { TeamsSlider } from "../../components/components/landing/teamsSliders";
import { Carousel, Container, Row } from "react-bootstrap";

export const CarouselTournaments = (section) => {
  const [activeServiceCarousel, setActiveServiceCarousel] = useState(0);
  const handleSelect = (selectedIndex) => {
    setActiveServiceCarousel(selectedIndex);
  };

  const sub20Images = importAll(
    require.context(
      "../../assets/home/imagenes/sub20",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );
  const sub17Images = importAll(
    require.context(
      "../../assets/home/imagenes/sub17",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );
  const sub15Images = importAll(
    require.context(
      "../../assets/home/imagenes/sub15",
      false,
      /\.(png|jpe?g|svg)$/
    )
  );

  const sectionKey = Object.keys(section)[0];

  let sectionImages;
  if (sectionKey === "sub20") {
    sectionImages = sub20Images;
  } else if (sectionKey === "sub17") {
    sectionImages = sub17Images;
  } else if (sectionKey === "sub15") {
    sectionImages = sub15Images;
  }

  function importAll(r) {
    let images = [];
    r.keys().forEach((item, index) => {
      images[index] = r(item);
    });
    return images;
  }

  return (
    <>
      <div className="aboutUs">
        <Container>
          <Row className="aboutUs__mainContainer__topRow">
            <h1 className="text-center">{sectionKey.toUpperCase()}</h1>
          </Row>
          <Carousel onSelect={handleSelect} activeIndex={activeServiceCarousel}>
            {sectionImages &&
              sectionImages.map((item, i) => {
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
