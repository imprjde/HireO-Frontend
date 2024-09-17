import { useEffect, useState } from "react";

const useHasAnimated = () => {
  const [isAnimating, setIsAnimating] = useState(() => {
    return sessionStorage.getItem("hasAnimated") === null;
  });

  useEffect(() => {
    if (isAnimating) {
      sessionStorage.setItem("hasAnimated", "true");
      setTimeout(() => setIsAnimating(false), 1500);
    }
  }, [isAnimating]);

  return isAnimating;
};

export default useHasAnimated;
