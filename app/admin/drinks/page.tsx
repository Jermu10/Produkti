import Button from "@/components/Button";
import prisma from "@/lib/db";
import Link from "next/link";
import { deleteDrink, getDrinks } from "../actions/drink.actions";
import DrinkList from "@/components/DrinkList";

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
          <DrinkList drinks={drinks} />
        </div>
      </div>
    </>
  );
};

export default DrinksPage;
