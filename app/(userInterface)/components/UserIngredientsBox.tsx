import React from "react";

const UserIngredientsBox: React.FC<IngredientsBoxProps> = ({ ingredients }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Ainesosat
      </h2>
      <div className="flex flex-col space-y-2">
        {Object.entries(ingredients).map(([ingredient, amount]) => (
          <div key={ingredient} className="flex justify-between border-b ">
            <span className="font-medium mr-4">{ingredient}</span>
            <span>{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserIngredientsBox;
