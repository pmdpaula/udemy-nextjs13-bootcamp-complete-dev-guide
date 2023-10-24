/* eslint-disable @next/next/no-img-element */
import Image from 'next/image';

interface ImagesListProps {
  images: string[];
}

export const ImagesList = ({ images }: ImagesListProps) => {
  return (
    <div>
      <h1 className="font-bold text-3xl mt-10 mb-7 border-b pb-5">
        {images.length} photo{images.length > 1 ? 's' : ''}
      </h1>
      <div className="flex flex-wrap">
        {images.map((image) => (
          <div
            className="mr-1 mb-1"
            key={image}
          >
            <Image
              src={image}
              alt=""
              width={150}
              height={80}
            />
            {/* <p className="text-sm text-gray-500">Photo by: {image}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
};
