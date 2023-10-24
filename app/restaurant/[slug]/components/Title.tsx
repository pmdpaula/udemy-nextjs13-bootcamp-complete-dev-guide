type TitleProps = {
  children: React.ReactNode;
};

const Title = ({ children }: TitleProps) => {
  return (
    <div className="mt-4 border-b pb-6">
      <h1 className="font-bold text-6xl">{children}</h1>
    </div>
  );
};

export default Title;
