"use client";
import React, { useState, useRef, FormEvent, startTransition } from "react";
import {
  Modal,
  Button,
  Input,
  Textarea,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  ModalContent,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { createDrink } from "@/app/actions/drink.actions";
import { toast } from "react-toastify";

const CreateDrinkModalForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredients, setIngredients] = useState<{ [key: string]: string }>({});

  const handleAddIngredient = () => {
    if (ingredientName && ingredientAmount) {
      setIngredients((prevIngredients) => ({
        ...prevIngredients,
        [ingredientName]: ingredientAmount,
      }));
      setIngredientName("");
      setIngredientAmount("");
    }
  };

  const handleDeleteIngredient = (name: string) => {
    setIngredients((prevIngredients) => {
      const newIngredients = { ...prevIngredients };
      delete newIngredients[name];
      return newIngredients;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (formRef.current) {
      if (Object.keys(ingredients).length === 0) {
        toast.error("Lisää ainakin yksi ainesosa!");
        return;
      }

      const formData = new FormData(formRef.current);
      formData.set("ingredients", JSON.stringify(ingredients));

      startTransition(async () => {
        try {
          const { success, error } = await createDrink(formData);
          if (error) {
            console.error(error);
            toast.error("Virhe drinkin luomisessa.");
          } else {
            console.log(success);
            toast.success(success);
            formRef.current?.reset();
            setIngredients({});
            onClose();
          }
        } catch (err) {
          console.error("Virhe:", err);
          toast.error("Virhe drinkin luomisessa.");
        }
      });
    }
  };

  return (
    <div>
      <Button onClick={onOpen} color="secondary" size="lg" className="p-5">
        Lisää drinkki
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size="xl">
        <ModalContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader>Luo drinkki</ModalHeader>
            <ModalBody>
              <Input
                name="name"
                label="Drinkin nimi"
                placeholder="Lisää drinkin nimi"
                variant="bordered"
                required
              />
              <Select
                name="category"
                label="Kategoria"
                placeholder="Valitse kategoria"
                variant="bordered"
                required
              >
                <SelectItem key="drinkki" value="drinkki">
                  Drinkki
                </SelectItem>
                <SelectItem key="mocktail" value="mocktail">
                  Mocktail
                </SelectItem>
              </Select>

              <div>
                <h4>Ainesosat</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Input
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    placeholder="Aineosa"
                    variant="bordered"
                  />
                  <Input
                    value={ingredientAmount}
                    onChange={(e) => setIngredientAmount(e.target.value)}
                    placeholder="Määrä"
                    variant="bordered"
                  />
                  <Button color="primary" onClick={handleAddIngredient}>
                    Lisää
                  </Button>
                </div>
                <ul>
                  {Object.entries(ingredients).map(([name, amount]) => (
                    <li key={name}>
                      {name}: {amount}{" "}
                      <Button
                        size="sm"
                        color="danger"
                        onClick={() => handleDeleteIngredient(name)}
                      >
                        Poista
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>

              <Textarea
                name="instructions"
                label="Valmistusohjeet"
                placeholder="Lisää valmistusohjeet"
                required
                variant="bordered"
              />
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" type="submit">
                Luo drinkki
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default CreateDrinkModalForm;
