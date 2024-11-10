"use client";

import React from "react";
import DrinkCard from "./DrinkCard";

const DrinkList: React.FC<DrinkListProps> = ({ drinks, styles }) => {
  return (
    <div className={`${styles}`}>
      {drinks.map((drink) => (
        <DrinkCard key={drink.id} drink={drink} />
      ))}
    </div>
  );
};

export default DrinkList;
