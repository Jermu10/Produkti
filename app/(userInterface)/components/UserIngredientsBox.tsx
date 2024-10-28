const UserIngredientsBox: React.FC<IngredientsBoxProps> = ({ ingredients }) => {
  return (
    <div className="border-5 border-customGreen rounded-small flex justify-start">
      <div className="p-2">
        {Object.entries(ingredients).map(([key, value], index) => (
          <div key={index}>
            <p>
              {key} : {value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserIngredientsBox;
