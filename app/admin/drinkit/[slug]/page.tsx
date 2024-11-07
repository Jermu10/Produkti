import { getDrink } from "@/app/actions/drink.actions";
import Header from "@/components/Header";

import DeleteDrinkButton from "../../components/DeleteDrinkButton";
import UserIngredientsBox from "@/app/(userInterface)/components/UserIngredientsBox";
import EditDrinkModal from "../../components/EditDrinkModalForm";

const DrinkPage = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const drink = await getDrink(slug);

  const textColor = drink.category === "drinkki" ? "text-customOrange" : "";

  return (
    <>
      <div className={`flex flex-col items-center min-h-screen ${textColor}`}>
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
      <div className="fixed bottom-4 right-4">
        <EditDrinkModal drink={drink} />

        <DeleteDrinkButton DrinkId={drink.id} />
      </div>
    </>
  );
};

export default DrinkPage;
