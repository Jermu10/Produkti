import Header from "@/components/Header";
import React from "react";
import { getAllReviews } from "../actions/reviews.actions";

const ReviewPage = async () => {
  const reviews = await getAllReviews();

  return (
    <>
      <Header text="Arvostelut" />

      <div>
        {reviews.map((review) => (
          <p>{review.drink}</p>
        ))}
      </div>
    </>
  );
};

export default ReviewPage;
