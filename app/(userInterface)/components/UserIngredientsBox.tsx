import React from "react";

interface IngredientsBoxProps {
  ingredients: Record<string, string>;
}

const UserIngredientsBox: React.FC<IngredientsBoxProps> = ({ ingredients }) => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-4 text-center md:text-left">
        Ingredients
      </h2>
      <div className="flex flex-col space-y-2">
        {Object.entries(ingredients).map(([ingredient, amount]) => (
          <div key={ingredient} className="flex justify-between border-b pb-2">
            <span className="font-medium">{ingredient}</span>
            <span>{amount}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserIngredientsBox;

// const UserIngredientsBox: React.FC<IngredientsBoxProps> = ({ ingredients }) => {
//   return (
//     <div>
//       {Object.entries(ingredients).map(([key, value], index) => (
//         <div key={index}>
//           <p>
//             {key} : {value}
//           </p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default UserIngredientsBox;
