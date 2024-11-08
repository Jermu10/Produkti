import Header from "@/components/Header";
import { getNewestDrinks } from "../actions/drink.actions";
import SmallDrinkList from "@/components/SmallDrinkList";
import SmallReviewList from "@/components/SmallReviewList";
import { getLatestReviews } from "../actions/reviews.actions";

const home = async () => {
  const drinks = await getNewestDrinks(5);
  const reviews = await getLatestReviews(5);

  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header text="Drinkkilinkki" />
      <SmallDrinkList drinks={drinks} />
      <SmallReviewList reviews={reviews} />
    </div>
  );
};

export default home;
