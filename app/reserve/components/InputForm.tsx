type InputFormProps = {
  type: string;
  placeholder: string;
};

export const InputForm = ({ type, placeholder }: InputFormProps) => {
  return (
    <input
      type={type}
      className="border rounded p-3 w-80 mb-4"
      placeholder={placeholder}
    />
  );
};
