import React from "react";

const RMClassCard = ({ classTimes }) => {
  console.log(classTimes);
  return (
    <div>
      <h1>{classTimes.sport.sport_name}</h1>
    </div>
  );
};

export default RMClassCard;
