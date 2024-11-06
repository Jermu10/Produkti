import { getReview } from "@/app/actions/reviews.actions";
import Header from "@/components/Header";
import EditReviewsModalForm from "../../components/EditReviewsModalForm";
import DeleteReviewButton from "../../components/DeleteReviewButton";
import { formatLastUpdated } from "@/lib/utils";

const AdminReview = async ({
  params: { slug },
}: {
  params: { slug: string };
}) => {
  const review = await getReview(slug);

  return (
    <>
      <Header text={review.drink} />
      <div className="flex flex-col md:flex-row gap-4 p-4 justify-between items-start">
        <div className="md:w-1/4 flex flex-col items-center">
          <h2 className="text-9xl font-bold">{review.rating}/5</h2>
          <div className="flex gap-3">
            <p>{formatLastUpdated(review.createdAt, review.updatedAt)}</p>
            <p>{review.creator}</p>
          </div>
        </div>
        <div className="md:w-1/2 text-2xl ml-auto">
          <p>{review.introduction}</p>
          <br />
          <p>{review.review}</p>
        </div>
      </div>
      <div className="fixed bottom-4 right-4">
        <EditReviewsModalForm review={review} />

        <DeleteReviewButton reviewId={review.id} />
      </div>
    </>
  );
};

export default AdminReview;
