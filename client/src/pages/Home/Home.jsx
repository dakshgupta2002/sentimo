import React from "react";
import { Sidebar, Carousel, CarouselItem } from "../../components";

export default function Home() {
  return (
    <>
      <Sidebar/>
      <Carousel>
        <CarouselItem />
        <CarouselItem />
        <CarouselItem />
      </Carousel>
    </>
  );
}
