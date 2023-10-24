import { ReactNode } from 'react';

import { Header } from './components/Header';

interface RestaurantLayoutProps {
  children: ReactNode;
  params: { slug: string };
}

const RestaurantLayout = ({ children, params }: RestaurantLayoutProps) => {
  return (
    <>
      <Header title={params.slug} />

      <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
        {children}
      </div>
    </>
  );
};

export default RestaurantLayout;
