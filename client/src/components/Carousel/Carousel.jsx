import React, { useState } from "react";
import { useSwipeable } from "react-swipeable";
import { Button } from "@mui/material";

import "./Carousel.css";

// Get Date
const todayDate = (index, total) => {
  var date = new Date();
  index = total - index - 1;
  date.setDate(date.getDate() - index);

  return date.toDateString();
};

// Carousel Items
export const CarouselItem = ({ index, total, width }) => {
  return (
    // Can make width smaller for zoom out effect
    <div className="carousel-item" style={{ width: width }}>
      {todayDate(index, total)}
    </div>
  );
};

// Carousel
const Carousel = ({ children }) => {
  var totalChildren = React.Children.count(children);
  const [activeIndex, setActiveIndex] = useState(totalChildren - 1);

  const updateIndex = (newIndex) => {
    if (newIndex < 0) 
      newIndex = 0;
    else if (newIndex >= totalChildren)
      newIndex = totalChildren - 1;

    setActiveIndex(newIndex);
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => updateIndex(activeIndex + 1),
    onSwipedRight: () => updateIndex(activeIndex - 1),
  });

  return (
    <div {...handlers} className="carousel">
      <div
        className="inner"
        style={{ transform: `translateX(-${activeIndex * 100}%)` }}
      >
        {React.Children.map(children, (child, index) => {
          return React.cloneElement(child, {
            index: index.toString(),
            total: totalChildren,
            width: "100%",
          });
        })}
      </div>
      <div className="indicators">
        <Button
          variant="contained"
          onClick={() => {
            updateIndex(activeIndex - 1);
          }}
        >
          Prev
        </Button>

        <Button
          variant="contained"
          onClick={() => {
            updateIndex(activeIndex + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Carousel;
