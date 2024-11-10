import Header from "@/components/Header";
import { getNewestDrinks } from "../actions/drink.actions";
import SmallDrinkList from "@/components/SmallDrinkList";
import SmallReviewList from "@/components/SmallReviewList";
import { getLatestReviews } from "../actions/reviews.actions";
import DrinkList from "@/components/DrinkList";
import ReviewList from "@/components/ReviewList";

const home = async () => {
  const drinks = await getNewestDrinks(4);
  const reviews = await getLatestReviews(4);

  return (
    <div className="flex flex-col items-center min-h-screen ">
      <Header text="Drinkkilinkki" />
      <div className="hidden md:block w-full max-w-screen-xl p-4">
        <h2 className="text-5xl text-center">
          <span className="text-customOrange">Uusimmat drinkit</span> ja
          moctailit
        </h2>
        <DrinkList styles="flex flext-center mb-10 " drinks={drinks} />
        <div>
          <h2 className="text-5xl text-red-400 text-center">
            <span>Uusimmat arvostelut</span>
          </h2>
          <ReviewList reviews={reviews} />
        </div>
      </div>
      <div className="block md:hidden">
        <SmallDrinkList drinks={drinks} />
        <SmallReviewList reviews={reviews} />
      </div>
    </div>
  );
};

export default home;
