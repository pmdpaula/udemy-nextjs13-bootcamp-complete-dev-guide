import { Reviews } from '@prisma/client';

import { calculateReviewRatingAverage } from '../../../../utils/calculateReviewRatingAverage';
import Stars from '../../../components/Stars';

interface RatingProps {
  reviews: Reviews[];
}

export const Rating = ({ reviews }: RatingProps) => {
  const rating = calculateReviewRatingAverage(reviews);
  return (
    <div className="flex items-end">
      <div className="ratings mt-2 flex items-center">
        <Stars rating={rating} />
        <p className="text-reg ml-3">{rating}</p>
      </div>
      <div>
        <p className="text-reg ml-4">
          {reviews.length > 0 && reviews.length} Review{reviews.length === 1 ? '' : 's'}
        </p>
      </div>
    </div>
  );
};
