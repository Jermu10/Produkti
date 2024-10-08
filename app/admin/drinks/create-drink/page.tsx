"use client";

import Button from "@/components/Button";
import { createDrink } from "../../actions/drink.actions";

const CreateDrinkPage = () => {
  return (
    <>
      <div>
        <Button text="Takaisin" link="/admin/drinks/" />
      </div>
      <div className="flex items-center justify-center min-h-screen">
        <form
          action={createDrink}
          className="bg-white p-8 rounded shadow-md w-full max-w-md"
        >
          <h2 className="text-5xl font-semibold mb-6 text-center">
            Lisää drinkki
          </h2>
          <div className="mb-4">
            <label className="block">Drinkin nimi</label>
            <input
              name="name"
              placeholder="Drinkin nimi"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Kategoria</label>
            <select
              name="category"
              className="w-full px-3 py-2 border rounded"
              required
            >
              <option value="">Valitse kategoria</option>
              <option value="drinkki">Drinkki</option>
              <option value="mocktail">Mocktail</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block">Ainekset</label>
            <textarea
              name="ingredients"
              placeholder="Ainekset"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Valmistusohjeet</label>
            <textarea
              name="instructions"
              placeholder="Valmistusohjeet"
              className="w-full px-3 py-2 border rounded"
              required
            />
          </div>
          <div className="text-center">
            <input
              type="submit"
              value="Lähetä"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
            />
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateDrinkPage;
