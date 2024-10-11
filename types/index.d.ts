declare type ButtonProps = {
  children: React.ReactNode;
  className?: string;
};

declare type DeleteButtonProps = {
  id: string;
};

declare type DrinkFormProps = {
  initialData?: {
    id?: string;
    name: string;
    category: string;
    ingredients: { [key: string]: string };
    instructions: string;
  };
  isEditMode?: boolean;
};
