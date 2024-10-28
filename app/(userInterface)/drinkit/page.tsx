import DrinkList from "@/components/DrinkList";
import React from "react";
import { getUserDrinks } from "../actions/drink.actions";

export const DrinksPage = async () => {
  const drinks = await getUserDrinks();

  return (
    <>
      <div>
        drinkit
        <DrinkList drinks={drinks} />
      </div>
    </>
  );
};

export default DrinksPage;
