import Button from "@/components/Button";
import prisma from "@/lib/db";

import Link from "next/link";

import DeleteButton from "@/components/DeleteButton";
import { getDrinks } from "../actions/drink.actions";

const DrinksPage = async () => {
  const drinks = await getDrinks();

  return (
    <>
      <Button>
        <Link href="/admin/drinks/create-drink">Luo drinkki</Link>
      </Button>

      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white p-8 rounded shadow-md w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">Drinks List</h1>
          <ul className="space-y-4">
            {drinks.map((drink) => (
              <li key={drink.id} className="border-b pb-4">
                <Link href={`/admin/drinks/${drink.id}`}>
                  <div className="block text-center">
                    <h2 className="text-2xl font-semibold">{drink.name}</h2>
                    <div className="mt-2 whitespace-pre-wrap">
                      {JSON.stringify(drink.ingredients, null, 2)}
                    </div>
                    <p className="mt-2">{drink.instructions}</p>
                  </div>
                </Link>
                <DeleteButton id={drink.id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrinksPage;
