import { PrismaClient } from '@prisma/client';

import { Header } from './components/Header';
import { RestaurantCard } from './components/RestaurantCard';
import { SearchSideBar } from './components/SearchSideBar';
import { RestaurantDTO } from '../dtos/RestaurantDTO';
import { SearchRestaurantParamsDTO } from '../dtos/SearchRestaurantParamsDTO';

const prisma = new PrismaClient();

const fetchRestaurantBySearchParams = (searchParams: SearchRestaurantParamsDTO) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {};

  if (searchParams.city) {
    const location = {
      name: {
        contains: searchParams.city,
        mode: 'insensitive',
      },
    };

    where.location = location;
  }

  if (searchParams.cuisine) {
    const cuisine = {
      name: {
        contains: searchParams.cuisine,
        mode: 'insensitive',
      },
    };

    where.cuisine = cuisine;
  }

  if (searchParams.price) {
    const price = {
      equals: searchParams.price,
    };

    where.price = price;
  }

  const select = {
    id: true,
    name: true,
    main_image: true,
    slug: true,
    price: true,
    location: {
      select: {
        name: true,
      },
    },
    cuisine: {
      select: {
        name: true,
      },
    },
    reviews: true,
  };

  return prisma.restaurants.findMany({
    where,
    select,
  });
};

const fetchLocations = async () => {
  const locations = await prisma.locations.findMany();

  return locations;
};

const fetchCuisines = async () => {
  const cuisines = await prisma.cuisines.findMany();

  return cuisines;
};

const Search = async ({ searchParams }: { searchParams: SearchRestaurantParamsDTO }) => {
  const restaurants: RestaurantDTO[] = await fetchRestaurantBySearchParams(searchParams);
  const locations = await fetchLocations();
  const cuisines = await fetchCuisines();

  return (
    <>
      <Header />
      <div className="flex py-4 m-auto w-2/3 justify-between items-start">
        <SearchSideBar
          locations={locations}
          cuisines={cuisines}
          searchParams={searchParams}
        />
        <div className="w-5/6">
          {restaurants.length > 0 ? (
            restaurants.map((restaurant) => {
              return (
                <RestaurantCard
                  key={restaurant.id}
                  restaurant={restaurant}
                />
              );
            })
          ) : (
            <p>Sorry, we found no restaurants in this area</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Search;
