"use client";

import React from "react";
import ReviewCard from "./ReviewCard";

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    // <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
    <div className="flex flex-middle ">
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewList;
