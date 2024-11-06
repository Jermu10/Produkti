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
        <CreateDrinkModalForm />
      </div>
      <DrinkList drinks={drinks} />
    </>
  );
};

export default DrinksPage;
