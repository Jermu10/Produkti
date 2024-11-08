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
import { toast } from "react-toastify";

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
        try {
          const { data, error } = await updateReview(review.id, formData);
          if (error) {
            console.error(error);
            toast.error(error);
          } else {
            console.log("Arvostelu päivitetty");
            toast.success("Arvostelu päivitetty!");
            onClose();

            if (data) {
              router.push(`/admin/arvostelut/${data.slug}`);
            }
          }
        } catch (err) {
          console.error("Virhe:", err);
          toast.error(
            "Viestin lähettäminen epäonnistui. Yritä myöhemmin uudelleen."
          );
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
                required
              />
              <Input
                name="rating"
                label="Arvosana 1-5"
                type="number"
                defaultValue={review.rating}
                variant="bordered"
                required
              />
              <Textarea
                name="introduction"
                label="Johdanto"
                defaultValue={review.introduction}
                variant="bordered"
                required
                size="sm"
              />
              <Textarea
                name="review"
                label="Arvostelu"
                defaultValue={review.review}
                variant="bordered"
                required
                size="lg"
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" color="danger" onClick={onClose}>
                Peruuta
              </Button>
              <Button type="submit" color="primary" disabled={isPending}>
                {isPending ? "Lataa..." : "Tallenna"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditReviewsModalForm;
