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

interface ReviewCardProps {
  review: {
    id: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
    creator: string | null;
    drink: string;
    review: string;
    rating: string;
    introduction: string;
  };
}

interface ReviewData {
  drink: string;
  slug: string;
  rating: string;
  introduction: string;
  review: string;
}

interface ReviewResult {
  success?: string;
  error?: string;
}

interface DrinkResult {
  success?: string;
  error?: string;
}

interface UpdatedReviewResult {
  data?: Review;
  error?: string;
}

interface UpdatedDrinkResult {
  data?: Drink;
  error?: string;
}

interface Drink {
  id: string;
  name: string;
  category: string;
  ingredients: any;
  instructions: string;
  slug: string;
}

interface Review {
  id: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  creator: string | null;
  drink: string;
  review: string;
  rating: string;
  introduction: string;
}
