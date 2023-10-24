import { Reviews } from '@prisma/client';

export const calculateReviewRatingAverage = (reviews: Reviews[]) => {
  if (reviews.length > 0) {
    const total = reviews.reduce((acc, review) => acc + review.rating, 0);
    return Number((total / reviews.length).toFixed(1));
  }

  return 0;
};
