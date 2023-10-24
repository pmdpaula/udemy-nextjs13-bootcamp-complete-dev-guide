type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => {
  function renderTitle(name: string) {
    const nameSplitted = name.split('-');
    nameSplitted[nameSplitted.length - 1] = `(${nameSplitted[nameSplitted.length - 1]})`;

    return nameSplitted.join(' ');
  }

  return (
    <div className="h-96 overflow-hidden">
      <div className="bg-center bg-gradient-to-r from-[#0f1f47] to-[#5f6984] h-full flex justify-center items-center">
        <h1 className="text-7xl text-white capitalize text-shadow text-center">
          {renderTitle(title)}
        </h1>
      </div>
    </div>
  );
};
