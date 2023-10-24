import { Cuisines, Locations, PRICE, Restaurants, Reviews } from '@prisma/client';
import Link from 'next/link';

import { Price } from './Price';
import Stars from './Stars';
import { calculateReviewRatingAverage } from '../../utils/calculateReviewRatingAverage';

export interface RestaurantCardType {
  id: Restaurants['id'];
  name: Restaurants['name'];
  main_image: Restaurants['main_image'];
  slug: Restaurants['slug'];
  cuisine: Cuisines;
  location: Locations;
  price: PRICE;
  reviews: Reviews[];
}

type RestaurantCardProps = {
  restaurantData: RestaurantCardType;
};

export const RestaurantCard = ({ restaurantData }: RestaurantCardProps) => {
  const rating = calculateReviewRatingAverage(restaurantData.reviews);

  return (
    <Link href={`/restaurant/${restaurantData.slug}`}>
      <div className="w-64 h-72 m-3 rounded overflow-hidden border">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={restaurantData.main_image}
          alt=""
          className="w-full h-36"
        />
        <div className="p-1">
          <h3 className="font-bold text-2xl mb-2">{restaurantData.name}</h3>
          <div className="flex items-start">
            <div className="flex mb-2">
              <Stars rating={rating} />
            </div>
            <p className="ml-2">
              {restaurantData.reviews.length} review
              {restaurantData.reviews.length === 1 ? '' : 's'}
            </p>
          </div>
          <div className="flex text-reg font-light capitalize">
            <p className=" mr-3">{restaurantData.cuisine.name}</p>
            <p className="mr-3">{<Price price={restaurantData.price} />}</p>
            <p>Toronto</p>
          </div>
          <p className="text-sm mt-1 font-bold">Booked 3 times today</p>
        </div>
      </div>
    </Link>
  );
};
