import { InputForm } from './InputForm';

export const Form = () => {
  return (
    <div className="mt-10 flex flex-wrap justify-between w-[660px]">
      <InputForm
        type="text"
        placeholder="First name"
      />
      <InputForm
        type="text"
        placeholder="Last name"
      />
      <InputForm
        type="text"
        placeholder="Phone number"
      />
      <InputForm
        type="text"
        placeholder="Email"
      />
      <InputForm
        type="text"
        placeholder="Occasion (optional)"
      />
      <InputForm
        type="text"
        placeholder="Request (optional)"
      />
      <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">
        Complete reservation
      </button>
      <p className="mt-4 text-sm">
        By clicking “Complete reservation” you agree to the OpenTable Terms of Use and
        Privacy Policy. Standard text message rates may apply. You may opt out of
        receiving text messages at any time.
      </p>
    </div>
  );
};
