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
