import Button from "@/components/Button";
import { createDrink } from "../../actions/drink.actions";
import Link from "next/link";
import DrinkForm from "@/components/DrinkForm";

const CreateDrinkPage = () => {
  return (
    <>
      <Button className="bg-customOrange px-3 py-1 mb-5">
        <Link href="/admin/">Takaisin</Link>
      </Button>
      <DrinkForm />;
    </>
  );
};

export default CreateDrinkPage;
