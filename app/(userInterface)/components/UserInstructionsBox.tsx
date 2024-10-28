const UserInstructionsBox: React.FC<InstructionsBoxProps> = ({
  instructions,
}) => {
  return (
    <div className="border-5 border-customGreen rounded-small flex justify-start">
      <p className="p-2">{instructions}</p>
    </div>
  );
};

export default UserInstructionsBox;
