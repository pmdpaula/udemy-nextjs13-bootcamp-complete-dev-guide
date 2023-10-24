type HeaderProps = {
  imgSrc: string;
  title: string;
  date: string;
  time: string;
  partySize: string;
};

export const Header = ({ imgSrc, title, date, time, partySize }: HeaderProps) => {
  return (
    <div>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h3 className="font-bold">You're almost done!</h3>
      <div className="mt-5 flex">
        <img
          src={imgSrc}
          alt=""
          className="w-32 h-18 rounded"
        />
        <div className="ml-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          <div className="flex mt-3">
            <p className="mr-6">{date}</p>
            <p className="mr-6">{time}</p>
            <p className="mr-6">{partySize} people</p>
          </div>
        </div>
      </div>
    </div>
  );
};
