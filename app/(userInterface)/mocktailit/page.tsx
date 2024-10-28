import React from "react";
import { getUserMoctails } from "../actions/drink.actions";
import DrinkList from "@/components/DrinkList";

const MoctailPage = async () => {
  const moctails = await getUserMoctails();

  return (
    <div>
      <DrinkList drinks={moctails} />
    </div>
  );
};

export default MoctailPage;
