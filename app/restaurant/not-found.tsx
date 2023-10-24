import Image from 'next/image';

import errorImg from '../../public/icons/error.png';

// const NotFound = ({ error }: { error: Error }) => {
const NotFound = () => {
  return (
    <div className="h-screen bg-gray-200 flex flex-col justify-center items-center">
      <Image
        src={errorImg}
        alt=""
        width={220}
        height={220}
        className="mb-8"
      />

      <div className="bg-white px-9 py-14 shadow rounded">
        <h3 className="text-3xl font-bold">Well, this is embarassing</h3>
        <p className="text-reg font-bold">We couldn&apos;t find that restaurant</p>
        <p className="mt-6 text-sm font light">Error code: 404</p>
      </div>
    </div>
  );
};

export default NotFound;
