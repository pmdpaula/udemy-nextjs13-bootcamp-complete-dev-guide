import Image from 'next/image';

import emptyStarImg from '../../public/icons/empty-star.png';
import fullStarImg from '../../public/icons/full-star.png';
import halfStarImg from '../../public/icons/half-star.png';

interface StarsProps {
  rating: number;
}

const STAR_SIZE = 12;

const Stars = ({ rating }: StarsProps) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <Image
          src={fullStarImg}
          alt=""
          width={STAR_SIZE}
          height={STAR_SIZE}
        />,
      );
    } else if (i - rating > 0.2 && i - rating <= 0.6) {
      stars.push(
        <Image
          src={halfStarImg}
          alt=""
          width={STAR_SIZE}
          height={STAR_SIZE}
        />,
      );
    } else {
      stars.push(
        <Image
          src={emptyStarImg}
          alt=""
          width={STAR_SIZE}
          height={STAR_SIZE}
        />,
      );
    }
  }

  return (
    <div className="flex">
      {stars.map((star, index) => (
        <div key={index}>{star}</div>
      ))}
    </div>
  );
};

export default Stars;
