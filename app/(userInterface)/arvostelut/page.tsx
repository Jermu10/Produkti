import Header from "@/components/Header";
import React from "react";
import { getAllReviews } from "../../actions/reviews.actions";
import ReviewCard from "@/components/ReviewCard";

const ReviewPage = async () => {
  const reviews = await getAllReviews();

  return (
    <>
      <Header text="Arvostelut" />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2   justify-center ">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </>
  );
};

export default ReviewPage;
