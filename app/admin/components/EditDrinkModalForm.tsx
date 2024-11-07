// EditDrinkModal.tsx

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
import { updateDrink } from "@/app/actions/drink.actions";
import { useRouter } from "next/navigation";

interface EditDrinkModalProps {
  drink: Drink;
}

const EditDrinkModal: React.FC<EditDrinkModalProps> = ({ drink }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const formRef = useRef<HTMLFormElement>(null);

  const [name, setName] = useState(drink.name);
  const [category, setCategory] = useState(drink.category);
  const [ingredientName, setIngredientName] = useState("");
  const [ingredientAmount, setIngredientAmount] = useState("");
  const [ingredients, setIngredients] = useState<{ [key: string]: string }>(
    drink.ingredients || {}
  );
  const router = useRouter();
  const [instructions, setInstructions] = useState(drink.instructions);

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
      const formData = new FormData(formRef.current);
      formData.set("ingredients", JSON.stringify(ingredients));
      startTransition(async () => {
        const { data, error } = await updateDrink(drink.id, formData);
        if (error) {
          console.error(error);
        } else {
          console.log("Review updated");
          onClose();

          if (data) {
            router.push(`/admin/drinkit/${data.slug}`);
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
      <Modal isOpen={isOpen} onClose={onClose} placement="top-center" size="xl">
        <ModalContent>
          <form ref={formRef} onSubmit={handleSubmit}>
            <ModalHeader>Muokkaa</ModalHeader>
            <ModalBody>
              <Input
                name="name"
                label="Drinkki"
                variant="bordered"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Select
                name="category"
                label="Kategoria"
                placeholder="Select category"
                variant="bordered"
                required
                selectedKeys={new Set([category])}
                onSelectionChange={(keys) =>
                  setCategory(Array.from(keys)[0] as string)
                }
              >
                <SelectItem key="drinkki" value="drinkki">
                  Drinkki
                </SelectItem>
                <SelectItem key="mocktail" value="mocktail">
                  Mocktail
                </SelectItem>
              </Select>

              <div>
                <h4>Aineosat</h4>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Input
                    value={ingredientName}
                    onChange={(e) => setIngredientName(e.target.value)}
                    placeholder="Ingredient"
                    variant="bordered"
                  />
                  <Input
                    value={ingredientAmount}
                    onChange={(e) => setIngredientAmount(e.target.value)}
                    placeholder="Amount"
                    variant="bordered"
                  />
                  <Button color="secondary" onClick={handleAddIngredient}>
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
                label="Instructions"
                placeholder="Enter instructions"
                required
                variant="bordered"
                value={instructions}
                onChange={(e) => setInstructions(e.target.value)}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="primary" type="submit">
                Tallenna
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EditDrinkModal;
