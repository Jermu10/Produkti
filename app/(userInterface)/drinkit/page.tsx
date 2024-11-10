import DrinkList from "@/components/DrinkList";
import React from "react";
import { getUserDrinks } from "../../actions/drink.actions";
import Header from "@/components/Header";

const DrinksPage = async () => {
  const drinks = await getUserDrinks();

  return (
    <>
      <div className="text-customOrange">
        <Header text="Drinkit" />
        <DrinkList styles="flex flex-wrap justify-center" drinks={drinks} />
      </div>
    </>
  );
};

export default DrinksPage;
