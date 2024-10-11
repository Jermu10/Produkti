import Button from "@/components/Button";
import { createDrink } from "../../actions/drink.actions";
import Link from "next/link";
import DrinkForm from "@/components/DrinkForm";

const CreateDrinkPage = () => {
  return (
    <>
      <Button>
        <Link href="/admin/drinks/">Takaisin</Link>
      </Button>
      <DrinkForm />;
    </>
  );
};

export default CreateDrinkPage;
