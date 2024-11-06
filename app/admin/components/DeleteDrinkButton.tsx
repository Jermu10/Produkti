"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";
import { deleteDrink } from "@/app/actions/drink.actions";

const DeleteDrinkButton = ({ DrinkId }: { DrinkId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this review?")) {
      startTransition(async () => {
        const { success, error } = await deleteDrink(DrinkId);
        if (error) {
          console.error(error);
        } else {
          console.log(success);
          router.push("/admin/drinkit");
        }
      });
    }
  };

  return (
    <Button color="danger" onClick={handleDelete} disabled={isPending}>
      {isPending ? "Poistetaan..." : "Poista"}
    </Button>
  );
};

export default DeleteDrinkButton;
