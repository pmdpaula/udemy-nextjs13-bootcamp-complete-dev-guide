type DescriptionProps = {
  children: React.ReactNode;
};

export const Description = ({ children }: DescriptionProps) => {
  return (
    <div className="mt-4">
      <p className="text-lg font-light">{children}</p>
    </div>
  );
};
