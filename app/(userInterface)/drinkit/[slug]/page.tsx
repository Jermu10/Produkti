import React from "react";
import { getDrink } from "../../../actions/drink.actions";

import UserIngredientsBox from "../../components/UserIngredientsBox";
import Header from "@/components/Header";

const DrinkPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const drink = await getDrink(slug);

  return (
    <div className="flex flex-col items-center min-h-screen text-customOrange">
      <Header text={drink.name} />
      <div className="flex flex-col md:flex-row md:mt-20 justify-center text-2xl gap-16 w-full px-4 sm:px-6 lg:px-8 xl:px-12 ">
        {drink.ingredients && (
          <div className="mx-10">
            <UserIngredientsBox
              ingredients={drink.ingredients as Record<string, string>}
            />
          </div>
        )}

        <div className="w-full md:w-1/2 ">
          <p>{drink.instructions}</p>
        </div>
      </div>
    </div>
  );
};

export default DrinkPage;
