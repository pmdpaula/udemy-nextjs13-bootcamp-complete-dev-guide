import { PrismaClient, Reviews as ReviewsPrismaType } from '@prisma/client';
import { notFound } from 'next/navigation';

import { Description } from './components/Description';
import { ImagesList } from './components/ImagesList';
import { Rating } from './components/Rating';
import { ReservationCard } from './components/ReservationCard';
import { RestaurantNavBar } from './components/RestaurantNavBar';
import Reviews from './components/Reviews';
import Title from './components/Title';

const prisma = new PrismaClient();

const fetchRestaurantBySlug = async (slug: string): Promise<RestaurantType> => {
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      slug,
    },

    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true,
      open_time: true,
      close_time: true,
    },
  });

  if (!restaurant) {
    notFound();
  }

  return restaurant;
};

export type RestaurantType = {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: ReviewsPrismaType[];
  open_time: string;
  close_time: string;
};

const RestauranteDetails = async ({ params }: { params: { slug: string } }) => {
  const restaurant = await fetchRestaurantBySlug(params.slug);

  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavBar slug={restaurant.slug} />

        <Title>{restaurant.name}</Title>

        <Rating reviews={restaurant.reviews} />

        <Description>{restaurant.description}</Description>

        <ImagesList images={restaurant.images} />

        <Reviews reviews={restaurant.reviews} />
      </div>
      <div className="w-[27%] relative text-reg">
        <ReservationCard
          openTime={restaurant.open_time}
          closeTime={restaurant.close_time}
          slug={restaurant.slug}
        />
      </div>
    </>
  );
};

export default RestauranteDetails;
