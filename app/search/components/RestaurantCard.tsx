import Image from 'next/image';
import Link from 'next/link';

import { calculateReviewRatingAverage } from '../../../utils/calculateReviewRatingAverage';
import { Price } from '../../components/Price';
import Stars from '../../components/Stars';
import { RestaurantDTO } from '../../../dtos/RestaurantDTO';

interface RestaurantCardProps {
  restaurant: RestaurantDTO;
}

export const RestaurantCard = ({ restaurant }: RestaurantCardProps) => {
  const rating = calculateReviewRatingAverage(restaurant.reviews);

  function renderRatingText() {
    if (rating >= 4.5) {
      return 'Awesome';
    }

    if (rating >= 3.5) {
      return 'Good';
    }

    if (rating >= 2.5) {
      return 'Average';
    }

    if (rating >= 1.5) {
      return 'Poor';
    }

    return 'No rating yet. Be the first to review!';
  }

  return (
    <div className="border-b flex pb-5 ml-4">
      <Image
        src={restaurant.main_image}
        alt=""
        width={200}
        height={200}
        className="w-44 h-36 rounded"
      />
      <div className="pl-5">
        <h2 className="text-3xl">{restaurant.name}</h2>
        <div className="flex items-start">
          <div className="flex mb-2">
            <Stars rating={rating} />
          </div>
          <p className="ml-2 text-sm">{renderRatingText()}</p>
        </div>
        <div className="mb-9">
          <div className="font-light flex text-reg">
            <Price price={restaurant.price} />
            <p className="mr-4 capitalize">{restaurant.cuisine.name}</p>
            <p className="mr-4 capitalize">{restaurant.location.name}</p>
          </div>
        </div>
        <div className="text-red-600">
          <Link href={`/restaurant/${restaurant.slug}`}>View more information</Link>
        </div>
      </div>
    </div>
  );
};
