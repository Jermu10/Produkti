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

interface DrinkListProps {
  drinks: Drink[];
}

interface DrinkItemProps {
  drink: Drink;
}

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
  review: Review;
}

interface ReviewData {
  drink: string;
  slug: string;
  rating: string;
  introduction: string;
  review: string;
}

interface CreatingResult {
  success?: string;
  error?: string;
}

interface UpdatedReviewResult {
  data?: Review;
  error?: string;
}

interface ReviewListProps {
  reviews: Review[];
}

interface UpdatedDrinkResult {
  data?: Drink;
  error?: string;
}

interface EditDrinkModalProps {
  drink: Drink;
}
