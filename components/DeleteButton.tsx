"use client";

import { deleteDrink } from "@/app/admin/actions/drink.actions";

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const handleDelete = async () => {
    await deleteDrink(id);
  };

  return (
    <button onClick={handleDelete} className="bg-red-500 px-4 py-2">
      Delete
    </button>
  );
};

export default DeleteButton;
