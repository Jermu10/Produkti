"use client";

import { useRouter } from "next/navigation";
import { deleteReview } from "@/app/actions/reviews.actions";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";
import { toast } from "react-toastify";

const DeleteReviewButton = ({ reviewId }: { reviewId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Haluutko oikeest poistaa arvostelun???")) {
      startTransition(async () => {
        const { success, error } = await deleteReview(reviewId);
        if (error) {
          console.error(error);
          toast.error("Virhe arvostelun poistamisessa.");
        } else {
          console.log(success);
          toast.success(success);
          router.push("/admin/arvostelut");
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

export default DeleteReviewButton;
