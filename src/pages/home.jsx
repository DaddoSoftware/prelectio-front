import React from "react";
import {
  AboutUs,
  Main,
  CallToAction,
  Services,
  CarouselTeams,
} from "../components/components";

export const Home = () => {
  return (
    <div>
      <Main />
      <CarouselTeams />
      <AboutUs />
      <Services />
      <CallToAction />
    </div>
  );
};
