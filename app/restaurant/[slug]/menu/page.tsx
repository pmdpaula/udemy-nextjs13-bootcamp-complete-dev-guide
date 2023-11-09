import { PrismaClient } from '@prisma/client';

import { Menu } from '../components/Menu';
import { RestaurantNavBar } from '../components/RestaurantNavBar';

const prisma = new PrismaClient();

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurants.findUnique({
    where: {
      slug,
    },
    select: {
      items: true,
    },
  });

  if (!restaurant) {
    throw new Error('Restaurant not found');
  }

  return restaurant;
};

interface RestaurantMenuProps {
  params: {
    slug: string;
  };
}

const RestaurantMenu = async ({ params }: RestaurantMenuProps) => {
  const menu = await fetchRestaurantMenu(params.slug);

  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavBar slug={params.slug} />
      <Menu menuItems={menu.items} />
    </div>
  );
};

export default RestaurantMenu;
