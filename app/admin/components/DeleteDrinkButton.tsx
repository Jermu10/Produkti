"use client";

import { useRouter } from "next/navigation";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";
import { deleteDrink } from "@/app/actions/drink.actions";
import { toast } from "react-toastify";

const DeleteDrinkButton = ({ drinkId }: { drinkId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Haluutko oikeest poistaa drinkin???")) {
      startTransition(async () => {
        try {
          const { success, error } = await deleteDrink(drinkId);
          if (error) {
            console.error(error);
            toast.error(error);
          } else {
            console.log(success);
            toast.success(success);
            router.push("/admin/drinkit");
          }
        } catch (err) {
          console.error("Virhe:", err);
          toast.error("Virhe drinkin poistamisessa.");
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
