import Header from "@/components/Header";
import NewReviewForm from "../components/ReviewsModalForm";
import { getAllReviews } from "@/app/(userInterface)/actions/reviews.actions";
import ReviewCard from "@/components/ReviewCard";

const ReviewPage = async () => {
  const reviews = await getAllReviews();
  return (
    <>
      <Header text="Arvostelut" />
      <NewReviewForm />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:mt-20  justify-center ">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewPage;
