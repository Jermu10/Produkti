"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";

import { formatIngredients } from "@/lib/utils";

const DrinkItem: React.FC<DrinkItemProps> = ({ drink }) => {
  return (
    <li key={drink.id} className="border-b pb-4">
      <Link href={`/admin/drinks/${drink.id}`}>
        <div className="block text-center">
          <h2 className="text-2xl font-semibold">{drink.name}</h2>
          <div className="mt-2 whitespace-pre-wrap">
            {formatIngredients(drink.ingredients)}
          </div>
          <p className="mt-2">{drink.instructions}</p>
        </div>
      </Link>
    </li>
  );
};

export default DrinkItem;
