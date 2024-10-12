"use client";

import React from "react";
import Link from "next/link";
import Button from "./Button";
import { deleteDrink } from "@/app/admin/actions/drink.actions";
import { formatIngredients } from "@/lib/utils";

const DrinkItem: React.FC<DrinkItemProps> = ({ drink }) => {
  const handleDelete = async () => {
    await deleteDrink(drink.id);
  };

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
      <Button className="bg-red-500 px-4 py-2 mt-4" onClick={handleDelete}>
        Delete
      </Button>
    </li>
  );
};

export default DrinkItem;
