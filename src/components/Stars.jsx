import { useMemo } from "react";
import "./Stars.css";

function Stars() {
  const stars = useMemo(() => {
    return Array.from({ length: 180 }, () => ({
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 5}s`,
      size: `${Math.random() * 3 + 1}px`,
    }));
  }, []);

  return (
    <div className="stars-container">
      {stars.map((star, index) => (
        <div
          key={index}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            animationDelay: star.delay,
            width: star.size,
            height: star.size,
          }}
        />
      ))}
    </div>
  );
}

export default Stars;