"use client";

import React from "react";

import DrinkCard from "./DrinkCard";

const DrinkList: React.FC<DrinkListProps> = ({ drinks }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {drinks.map((drink) => (
        <DrinkCard drink={drink} />
      ))}
    </div>
  );
};

export default DrinkList;
