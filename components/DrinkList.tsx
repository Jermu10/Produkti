"use client";

import React from "react";
import DrinkItem from "./DrinkItem";

const DrinkList: React.FC<DrinkListProps> = ({ drinks }) => {
  return (
    <ul className="space-y-4">
      {drinks.map((drink) => (
        <DrinkItem key={drink.id} drink={drink} />
      ))}
    </ul>
  );
};

export default DrinkList;
