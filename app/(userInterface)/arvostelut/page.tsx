import Header from "@/components/Header";
import React from "react";
import { getAllReviews } from "../../actions/reviews.actions";
import ReviewCard from "@/components/ReviewCard";

const ReviewPage = async () => {
  const reviews = await getAllReviews();

  return (
    <div className="text-red-400">
      <Header text="Arvostelut" />
      <div className=" flex flex-wrap justify-center gap-4 ">
        {reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))}
      </div>
    </div>
  );
};

export default ReviewPage;
