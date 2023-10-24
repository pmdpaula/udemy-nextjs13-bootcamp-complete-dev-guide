import { PrismaClient } from '@prisma/client';

import { Header } from './components/Header';
import { RestaurantCard, RestaurantCardType } from './components/RestaurantCard';

const prisma = new PrismaClient();

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurants.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      location: true,
      slug: true,
      price: true,
      reviews: true,
    },
  });

  return restaurants;
};

const Home = async () => {
  const restaurants = await fetchRestaurants();

  return (
    <main>
      <Header />

      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurantData={restaurant}
          />
        ))}
      </div>
    </main>
  );
};

export default Home;
