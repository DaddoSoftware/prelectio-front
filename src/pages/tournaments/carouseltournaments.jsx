import React, { useEffect, useState } from "react";
import { TeamsSlider } from "../../components/components/landing/teamsSliders";
import { Carousel, Container, Row } from "react-bootstrap";
import { Grid, Button, Box } from "@mui/material";

export const CarouselTournaments = (props) => {
  const [activeServiceCarousel, setActiveServiceCarousel] = useState(0);
  const [activeSecondButton, setActiveSecondButton] = useState(0);
  const [sectionImages, setSectionImages] = useState([]);
  const [cronogramaImages, setCronogramaImages] = useState([]);
  const [goleadoresImages, setGoleadoresImages] = useState([]);
  const [posicionesImages, setPosicionesImages] = useState([]);
  const sectionKey = Object.keys(props)[0];

  useEffect(() => {
    setActiveSecondButton(2);
  }, [props]);

  useEffect(() => {
    setImages();
  }, [sectionKey]);

  useEffect(() => {
    const images = activeCarousel();
    setImages();
    setSectionImages(images);
  }, [activeSecondButton]);

  function importAll(r) {
    return r.keys().map(r);
  }

  function activeCarousel() {
    switch (activeSecondButton) {
      case 0:
        return cronogramaImages;
      case 1:
        return goleadoresImages;
      case 2:
        return posicionesImages;
      default:
        return cronogramaImages;
    }
  }

  const goleadoresSetImages = () => {
    switch (sectionKey) {
      case "sub17":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub17/goleadores",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      case "sub15":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub15/goleadores",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      default:
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub20/goleadores",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
    }
  };
  const cronogramaSetImages = () => {
    switch (sectionKey) {
      case "sub17":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub17/cronograma",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      case "sub15":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub15/cronograma",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      default:
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub20/cronograma",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
    }
  };
  const posicionesSetImages = () => {
    switch (sectionKey) {
      case "sub17":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub17/posiciones",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      case "sub15":
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub15/posiciones",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
      default:
        return importAll(
          require.context(
            "../../assets/home/imagenes/sub20/posiciones",
            false,
            /\.(png|jpe?g|svg)$/
          )
        );
    }
  };

  const setImages = () => {
    setPosicionesImages(posicionesSetImages());
    setGoleadoresImages(goleadoresSetImages());
    setCronogramaImages(cronogramaSetImages());
  };

  return (
    <Container>
      <Row className="aboutUs__mainContainer__topRow my-4">
        <h1 className="text-center">{sectionKey.toUpperCase()}</h1>
      </Row>
      <Grid container justifyContent="center" my={4}>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" flexWrap="wrap">
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mx: { xs: 1, sm: 2 },
                my: 1,
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
              onClick={() => setActiveSecondButton(0)}
            >
              Posiciones
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mx: { xs: 1, sm: 2 },
                my: 1,
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
              onClick={() => setActiveSecondButton(1)}
            >
              Goleadores
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{
                mx: { xs: 1, sm: 2 },
                my: 1,
                fontSize: { xs: "0.8rem", sm: "1rem" },
              }}
              onClick={() => setActiveSecondButton(2)}
            >
              Cronograma
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Carousel
        variant="dark"
        activeIndex={activeServiceCarousel}
        onSelect={(index) => setActiveServiceCarousel(index)}
      >
        {sectionImages.map((img, index) => (
          <Carousel.Item key={index}>
            <TeamsSlider img={img} />
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};
