import { PRICE, Reviews } from '@prisma/client';

export type RestaurantDTO = {
  id: number;
  name: string;
  slug: string;
  main_image: string;
  price: PRICE;
  location: {
    name: string;
  };
  cuisine: {
    name: string;
  };
  reviews: Reviews[];
  OpenTime: string;
  CloseTime: string;
};
