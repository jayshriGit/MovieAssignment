import React from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {/* Rating star with gold color */}
      {[...Array(props.count)].map((star, index) => {
        return (
          <label key={index}>
            <FaStar size={20} fill="gold" />
          </label>
        );
      })}
      {/* No rating star*/}
      {[...Array(10 - props.count)].map((star, index) => {
        return (
          <label key={index}>
            <FaStar size={20} fill="gray" />
          </label>
        );
      })}
    </div>
  );
};
