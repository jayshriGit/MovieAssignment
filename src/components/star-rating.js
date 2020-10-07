import React from "react";
import { FaStar } from "react-icons/fa";

export const StarRating = (props) => {
  return (
    <div style={{ display: "flex" }}>
      {[...Array(props.count)].map((star, index) => {
        return (
          <label key={index}>
            <FaStar size={20} fill="gold" />
          </label>
        );
      })}
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
