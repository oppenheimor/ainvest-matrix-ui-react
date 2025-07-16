import { useState } from "react";

export const useMouseEnter = () => {
  const [leftArrowHover, setLeftArrowHover] = useState(false);
  const [rightArrowHover, setRightArrowHover] = useState(false);
  const handleArrowMouseEnter = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setLeftArrowHover(true);
    } else {
      setRightArrowHover(true);
    }
  };

  const handleArrowMouseLeave = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setLeftArrowHover(false);
    } else {
      setRightArrowHover(false);
    }
  };

  return {
    leftArrowHover,
    rightArrowHover,
    handleArrowMouseEnter,
    handleArrowMouseLeave,
  };
};
