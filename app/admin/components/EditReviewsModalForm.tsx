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
  Textarea,
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
      <Button onClick={onOpen} color="secondary">
        Muokkaa
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        placement="top-center"
        size="2xl"
      >
        <ModalContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader>Muokkaa arvostelua</ModalHeader>
            <ModalBody>
              <Input
                name="drink"
                label="Tuotteen nimi"
                defaultValue={review.drink}
                variant="bordered"
                isRequired
              />
              <Input
                name="rating"
                label="Arvosana 1-5"
                type="number"
                defaultValue={review.rating}
                variant="bordered"
                isRequired
              />
              <Textarea
                name="introduction"
                label="Johdanto"
                defaultValue={review.introduction}
                variant="bordered"
                isRequired
                size="sm"
              />
              <Textarea
                name="review"
                label="Arvostelu"
                defaultValue={review.review}
                variant="bordered"
                isRequired
                size="lg"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onClick={onClose}>
                Peruuta
              </Button>
              <Button type="submit" color="primary" disabled={isPending}>
                {isPending ? "Lataa..." : "Päivitä arvostelu"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditReviewsModalForm;
