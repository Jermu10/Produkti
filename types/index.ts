declare type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
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

declare type DrinkListProps = {
  drinks: {
    id: string;
    name: string;
    ingredients: any;
    instructions: string;
  }[];
};

declare type DrinkItemProps = {
  drink: {
    id: string;
    name: string;
    ingredients: any;
    instructions: string;
  };
};
