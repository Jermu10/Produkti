import Button from "@/components/Button";
import prisma from "@/lib/db";
import Link from "next/link";

const DrinksPage = async () => {
  const drinks = await prisma.drink.findMany();

  return (
    <>
      <div className="flex mt-10 justify-end">
        <Button text="Lisää drinkki" link="/admin/drinks/create-drink" />
      </div>
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
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DrinksPage;
