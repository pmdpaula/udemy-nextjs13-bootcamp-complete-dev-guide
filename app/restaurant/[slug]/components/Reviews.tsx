import { Reviews } from '@prisma/client';

import { ReviewCard } from './ReviewCard';

interface ReviewsProps {
  reviews: Reviews[];
}

const Reviews = ({ reviews }: ReviewsProps) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
        What {reviews.length} {reviews.length > 1 ? 'people are' : 'person is'} saying
      </h1>
      <div>
        {reviews.length > 0 &&
          reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
            />
          ))}
        {reviews.length === 0 && (
          <>
            <p>Sorry, there are no reviews for this restaurant</p>
            <p>Be the first!</p>
          </>
        )}
      </div>
    </div>
  );
};

export default Reviews;
