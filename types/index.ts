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
    slug: string;
    category: string;
  }[];
};

declare type DrinkItemProps = {
  drink: {
    id: string;
    name: string;
    ingredients: any;
    instructions: string;
    slug: string;
    category: string;
  };
};

interface HeaderProps {
  text: string;
}

interface IngredientsBoxProps {
  ingredients: Record<string, string>;
}

interface InstructionsBoxProps {
  instructions: string;
}
