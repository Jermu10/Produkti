import Header from "@/components/Header";
import NewReviewForm from "../components/ReviewsModalForm";
import { getAllReviews } from "@/app/actions/reviews.actions";
import ReviewCard from "@/components/ReviewCard";

const ReviewPage = async () => {
  const reviews = await getAllReviews();
  return (
    <>
      <Header text="Arvostelut" />
      <div className="grid grid-cols-1 md:grid-cols-5 gap-2 md:mt-20  justify-center ">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <NewReviewForm />
      </div>
    </>
  );
};

export default ReviewPage;
