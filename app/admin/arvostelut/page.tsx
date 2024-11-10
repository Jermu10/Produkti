import Header from "@/components/Header";
import NewReviewForm from "../components/CreateReviewModalForm";
import { getAllReviews } from "@/app/actions/reviews.actions";
import ReviewCard from "@/components/ReviewCard";

const ReviewPage = async () => {
  const reviews = await getAllReviews();
  return (
    <>
      <Header text="Arvostelut" />
      <div className="flex flex-wrap justify-center gap-4  ">
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
