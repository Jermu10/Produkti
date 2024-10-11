"use client";

import { createDrink, editDrink } from "@/app/admin/actions/drink.actions";
import { useState, useEffect, FormEvent } from "react";

const DrinkForm = ({ initialData, isEditMode = false }: DrinkFormProps) => {
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredients, setIngredients] = useState<{ [key: string]: string }>({});
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [instructions, setInstructions] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setCategory(initialData.category);
      setIngredients(initialData.ingredients);
      setInstructions(initialData.instructions);
    }
  }, [initialData]);

  const handleAddIngredient = () => {
    if (ingredientName && ingredientAmount) {
      setIngredients((prevIngredients) => ({
        ...prevIngredients,
        [ingredientName]: ingredientAmount,
      }));
      setIngredientName("");
      setIngredientAmount("");
    }
  };

  const handleDeleteIngredient = (name: string) => {
    setIngredients((prevIngredients) => {
      const newIngredients = { ...prevIngredients };
      delete newIngredients[name];
      return newIngredients;
    });
  };

  const handleAction = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formData.set("ingredients", JSON.stringify(ingredients));

    if (isEditMode && initialData?.id) {
      formData.set("id", initialData.id);
      await editDrink(formData);
    } else {
      await createDrink(formData);
    }

    window.location.href = "/admin/drinks";
  };

  return (
    <form onSubmit={handleAction} className="space-y-8">
      <div className="space-y-2">
        <label htmlFor="name">Drinkin nimi</label>
        <input
          type="text"
          id="name"
          name="name"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="category">Kategoria</label>
        <select
          id="category"
          name="category"
          required
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        >
          <option value="">Valitse kategoria</option>
          <option value="drinkki">Drinkki</option>
          <option value="mocktail">Mocktail</option>
        </select>
      </div>
      <div className="space-y-2">
        <label htmlFor="ingredients">Ainekset</label>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Ainesosa"
            value={ingredientName}
            onChange={(e) => setIngredientName(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded mr-2"
          />
          <input
            type="text"
            placeholder="Määrä"
            value={ingredientAmount}
            onChange={(e) => setIngredientAmount(e.target.value)}
            className="w-1/2 px-3 py-2 border rounded"
          />
          <button
            type="button"
            onClick={handleAddIngredient}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 ml-2"
          >
            Lisää
          </button>
        </div>
        <ul>
          {Object.entries(ingredients).map(([name, amount]) => (
            <li key={name} className="flex justify-between mb-1">
              <span>{name}</span>
              <span>{amount}</span>
              <button
                type="button"
                onClick={() => handleDeleteIngredient(name)}
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 ml-2"
              >
                Poista
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-2">
        <label htmlFor="instructions">Valmistusohjeet</label>
        <textarea
          id="instructions"
          name="instructions"
          required
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="w-full px-3 py-2 border rounded"
        />
      </div>
      <div className="text-center">
        <input
          type="submit"
          value={isEditMode ? "Päivitä" : "Lähetä"}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 cursor-pointer"
        />
      </div>
    </form>
  );
};

export default DrinkForm;
