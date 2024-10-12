export const formatIngredients = (
  ingredients: Record<string, string>
): string => {
  return Object.entries(ingredients)
    .map(([key, value]) => `${key} : ${value}`)
    .join(", ");
};
