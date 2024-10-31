import DrinkList from "@/components/DrinkList";
import React from "react";
import { getUserDrinks } from "../../actions/drink.actions";
import Header from "@/components/Header";

export const DrinksPage = async () => {
  const drinks = await getUserDrinks();

  return (
    <>
      <div className="text-customOrange">
        <Header text="Drinkit" />
        <DrinkList drinks={drinks} />
      </div>
    </>
  );
};

export default DrinksPage;
