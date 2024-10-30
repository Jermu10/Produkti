import React from "react";
import { getUserMoctails } from "../actions/drink.actions";
import DrinkList from "@/components/DrinkList";
import Header from "@/components/Header";

const MoctailPage = async () => {
  const moctails = await getUserMoctails();

  return (
    <>
      <Header text="Moctailit" />
      <div>
        <DrinkList drinks={moctails} />
      </div>
    </>
  );
};

export default MoctailPage;
