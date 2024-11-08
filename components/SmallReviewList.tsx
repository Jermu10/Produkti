import { Divider } from "@nextui-org/divider";
import Link from "next/link";
import React from "react";

const SmallReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="w-full max-w-sm bg-white shadow-md rounded-lg p-4 mt-4">
      <h2 className="text-2xl font-semibold">
        <span>Uusimmat arvustelut</span>
      </h2>
      <Divider />
      <ul className="space-y-2 mt-2 text-lg">
        {reviews.map((review) => {
          const linkHref = `/arvostelut/${review.slug}`;

          return (
            <li key={review.id}>
              <Link href={linkHref} className="hover:underline">
                <span>{review.drink}</span>
                {" - "}
                <span>{review.rating}/5</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SmallReviewList;
