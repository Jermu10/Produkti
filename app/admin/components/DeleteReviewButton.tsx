"use client";

import { useRouter } from "next/navigation";
import { deleteReview } from "@/app/actions/reviews.actions";
import { Button } from "@nextui-org/react";
import { useTransition } from "react";

const DeleteReviewButton = ({ reviewId }: { reviewId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this review?")) {
      startTransition(async () => {
        const { success, error } = await deleteReview(reviewId);
        if (error) {
          console.error(error);
        } else {
          console.log(success);
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
