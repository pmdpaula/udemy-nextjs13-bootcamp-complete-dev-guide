import { PRICE } from '@prisma/client';

export type SearchRestaurantParamsDTO = {
  city: string | undefined;
  cuisine: string | undefined;
  price: PRICE | undefined;
};
