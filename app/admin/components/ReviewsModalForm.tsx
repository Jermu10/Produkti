"use client";
import { createReview } from "@/app/(userInterface)/actions/reviews.actions";
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

const ReviewsModalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      const formData = new FormData(formRef.current);
      startTransition(async () => {
        const { error } = await createReview(formData);
        if (error) {
          console.error(error);
        } else {
          console.log("Review added");
          formRef.current?.reset();
          onClose();
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onOpen} color="secondary" size="lg" className="p-5 m-10">
        Lisää arvostelu
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size="xl">
        <ModalContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Luo Arvostelu
            </ModalHeader>
            <ModalBody>
              <Input
                name="drink"
                autoFocus
                label="Tuotteen nimi"
                variant="bordered"
              />
              <Input
                name="rating"
                label="Arvosana 1-5"
                type="number"
                variant="bordered"
              />
              <Input
                name="introduction"
                label="Johdanto"
                type="textarea"
                variant="bordered"
              />
              <Input
                name="review"
                label="Arvostelu"
                type="textarea"
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onClick={onClose}>
                Sulje
              </Button>
              <Button color="primary" type="submit" disabled={isPending}>
                {isPending ? "Lisätään..." : "Lisää arvostelu"}
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ReviewsModalForm;
