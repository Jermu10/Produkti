import React from "react";
import { getUserDrink } from "../../actions/drink.actions";

import UserIngredientsBox from "../../components/UserIngredientsBox";
import Header from "@/components/Header";
import UserInstructionsBox from "../../components/UserInstructionsBox";

const MoctailPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const drink = await getUserDrink(slug);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header text={drink.name} />
      <div className="grid grid-cols-2 gap-20 mt-10">
        <UserIngredientsBox ingredients={drink.ingredients} />
        <UserInstructionsBox instructions={drink.instructions} />
      </div>
    </div>
  );
};

export default MoctailPage;
