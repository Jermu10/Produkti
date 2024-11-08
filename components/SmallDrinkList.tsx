import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import React from "react";

const SmallDrinkList: React.FC<DrinkListProps> = ({ drinks }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-2xl font-semibold ">
        <span className="text-customOrange">Uusimmat drinkit</span> ja moctailit
      </h2>
      <Divider />
      <ul className="space-y-2 mt-2 text-lg">
        {drinks.map((drink) => {
          const isDrink = drink.category.toLowerCase() !== "mocktail";
          const linkHref = isDrink
            ? `/drinkit/${drink.slug}`
            : `/mocktailit/${drink.slug}`;
          const textColor = isDrink ? "text-customOrange" : "";

          return (
            <li key={drink.id}>
              <Link href={linkHref}>
                <p className={`${textColor} hover:underline`}>{drink.name}</p>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SmallDrinkList;
