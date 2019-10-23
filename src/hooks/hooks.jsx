import { useState, useEffect } from "react";

export const useHover = ref => {
  const [, setHover] = useState(false);

  const enter = () => setHover(true);
  const leave = () => setHover(false);

  useEffect(() => {
    ref.current.addEventListener("mouseenter", enter);
    ref.current.addEventListener("mouseleave", leave);

    return () => {
      ref.current.removeEventListener("mouseenter", enter);
      ref.current.removeEventListener("mouseleave", leave);
    };
  });

  return { cursor: "move" };
};

export const useDraggable = ref => {
  const [offset, setOffset] = useState({ top: 0, left: 0 });
  const [origin, setOrigin] = useState();
  const [start, setStart] = useState();
  const [translateVector, setTranslateVector] = useState();
  const [isDragging, setIsDragging] = useState(false);

  const mousedown = event => {
    const { top, left } = event.target.getBoundingClientRect();
    setOrigin({ top, left });
    setIsDragging(true);
    setStart({ top: event.y, left: event.x });
  };

  const mousemove = event => {
    if (isDragging) {
      // console.log(event);
      // console.log(
      //   `top: ${event.y} - ${start.top} + ${origin.top} - ${offset.top} = ${event.y -
      //     start.top +
      //     origin.top -
      //     offset.top}`
      // );
      // console.log(
      //   `left: ${event.x} - ${start.left} + ${origin.left} - ${offset.left} = ${event.x -
      //     start.left +
      //     origin.left -
      //     offset.left}`
      // );
      setTranslateVector({
        top: event.y - start.top + origin.top - offset.top,
        left: event.x - start.left + origin.left - offset.left
      });
    }
  };

  const mouseup = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const { top, left } = ref.current.getBoundingClientRect();
    console.log(top, left);
    if (top === 0 && left === 0) {
      return;
    }
    setOffset({ top, left });
  }, []);

  useEffect(() => {
    ref.current.addEventListener("mousedown", mousedown);

    return () => {
      ref.current.removeEventListener("mousedown", mousedown);
    };
  });

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", mousemove);
      document.addEventListener("mouseup", mouseup);
    }

    return () => {
      document.removeEventListener("mousemove", mousemove);
      document.removeEventListener("mouseup", mouseup);
    };
  });
  if (translateVector === undefined) {
    return {};
  } else {
    return {
      transform: `translate(${translateVector.left}px, ${translateVector.top}px)`,
      transition: "transform 0.05s cubic-bezier(0.2, 0, 0, 1)"
    };
  }
};
