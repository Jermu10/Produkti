export const formatIngredients = (
  ingredients: Record<string, string>
): string => {
  return Object.entries(ingredients)
    .map(([key, value]) => `${key} : ${value}`)
    .join(", ");
};

export const formatCardIngredients = (
  ingredients: Record<string, string>
): string => {
  return Object.keys(ingredients).join(", ");
};

export function formatLastUpdated(createdAt: Date, updatedAt: Date): string {
  const lastUpdatedOrCreated = updatedAt > createdAt ? updatedAt : createdAt;
  return lastUpdatedOrCreated.toLocaleDateString("fi-FI", {
    year: "numeric",
    month: "long",
  });
}
