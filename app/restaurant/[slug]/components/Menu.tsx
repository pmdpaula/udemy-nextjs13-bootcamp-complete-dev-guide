import { Items } from '@prisma/client';

import { MenuCard } from './MenuCard';

interface MenuProps {
  menuItems: Items[];
}

export const Menu = ({ menuItems }: MenuProps) => {
  return (
    <main className="bg-white mt-5">
      <div>
        <div className="mt-4 pb-1 mb-1">
          <h1 className="font-bold text-4xl">Menu</h1>
        </div>
        {menuItems.length ? (
          <div className="flex flex-wrap justify-between">
            {menuItems.map((item) => (
              <MenuCard
                key={item.id}
                name={item.name}
                description={item.description}
                price={item.price}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-between">
            <p className="font-light mt-1 text-sm">
              This restaurant does not have a menu
            </p>
          </div>
        )}
      </div>
    </main>
  );
};
