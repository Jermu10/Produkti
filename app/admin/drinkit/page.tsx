import { getDrinks } from "@/app/actions/drink.actions";
import DrinkList from "@/components/DrinkList";
import Header from "@/components/Header";
import CreateDrinkModalForm from "@/app/admin/components/CreateDrinkModalForm";

const DrinksPage = async () => {
  const drinks = await getDrinks();

  return (
    <>
      <Header text="Drinkit" />
      <div className="flex  justify-center">
        <DrinkList styles="flex flex-wrap justify-center" drinks={drinks} />
      </div>
      <div className="fixed bottom-4 right-4">
        <CreateDrinkModalForm />
      </div>
    </>
  );
};

export default DrinksPage;
