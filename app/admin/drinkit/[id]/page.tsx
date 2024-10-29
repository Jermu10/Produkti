import prisma from "@/lib/db";

import Button from "@/components/Button";
import Link from "next/link";
import { notFound } from "next/navigation";
import DrinkForm from "@/components/DrinkForm";
import { getDrink } from "../../actions/drink.actions";

const DrinkPage = async ({ params: { id } }: { params: { id: string } }) => {
  const drink = await getDrink(id);

  return (
    <>
      <Button className="bg-customOrange py-1 px-3 mb-5">
        <Link href="/admin/">Takaisin</Link>
      </Button>
      <DrinkForm
        initialData={{
          ...drink,
          ingredients: drink.ingredients as { [key: string]: string },
        }}
        isEditMode
      />
      ;
    </>
  );
};

export default DrinkPage;
