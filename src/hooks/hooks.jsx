import { useRef, useState, useEffect } from "react";

export const useHover = () => {
  const ref = useRef();
  const [isHover, setHover] = useState(false);

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

  return [ref, isHover];
};

export const useDraggable = initialPosition => {
  const ref = useRef();
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [mouseOffset, setMouseOffset] = useState();

  const mousedown = event => {
    setIsDragging(true);
    const rect = event.target.getBoundingClientRect();
    const offset = { top: event.clientY - rect.top, left: event.clientX - rect.left };
    setMouseOffset(offset);
  };

  const mousemove = event => {
    if (isDragging) {
      setPosition({ top: event.clientY - mouseOffset.top, left: event.clientX - mouseOffset.left });
    }
  };

  const mouseup = () => {
    setIsDragging(false);
  };

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

  const draggableStyle = {
    transform: `translate(${position.left}px, ${position.top}px)`,
    transition: "transform 0.05s cubic-bezier(0.2, 0, 0, 1)"
  };
  return [ref, draggableStyle, setPosition];
};
