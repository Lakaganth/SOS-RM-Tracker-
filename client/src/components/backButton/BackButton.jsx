import React from "react";
import Back from "../../assets/img/backbutton.svg";
import "./backButton.scss";

export const BackButton = () => {
  return (
    <div className="back-button">
      <img src={Back} alt="Go back" />
    </div>
  );
};
