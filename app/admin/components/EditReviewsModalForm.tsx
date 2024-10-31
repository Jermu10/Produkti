"use client";
import { updateReview } from "@/app/actions/reviews.actions";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useRef, FormEvent, useTransition } from "react";
import { useRouter } from "next/navigation";

const EditReviewsModalForm = ({ review }: { review: any }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(async () => {
        const { data, error } = await updateReview(review.id, formData);
        if (error) {
          console.error(error);
        } else {
          console.log("Review updated");
          onClose();

          if (data) {
            router.push(`/admin/arvostelut/${data.slug}`);
          }
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onOpen} color="primary">
        Edit Review
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size="xl">
        <ModalContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader>Edit Review</ModalHeader>
            <ModalBody>
              <Input
                name="drink"
                label="Drink Name"
                defaultValue={review.drink}
                variant="bordered"
              />
              <Input
                name="rating"
                label="Rating"
                type="string"
                defaultValue={review.rating}
                variant="bordered"
              />
              <Input
                name="introduction"
                label="Introduction"
                defaultValue={review.introduction}
                variant="bordered"
              />
              <Input
                name="review"
                label="Review"
                defaultValue={review.review}
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" color="primary" disabled={isPending}>
                {isPending ? "Updating..." : "Update Review"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditReviewsModalForm;
