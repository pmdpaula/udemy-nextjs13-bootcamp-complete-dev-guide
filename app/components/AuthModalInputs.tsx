import { SignUpDTO } from '../../dtos/SignUpDTO';

interface AuthModalInputProps {
  inputs: SignUpDTO;
  isSignIn: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChangeInputs: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const AuthModalInputs = ({
  inputs,
  isSignIn,
  handleChangeInputs,
}: AuthModalInputProps) => {
  return (
    <div>
      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="First Name"
            value={inputs.firstName}
            onChange={handleChangeInputs}
            name="firstName"
          />

          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Last Name"
            value={inputs.lastName}
            onChange={handleChangeInputs}
            name="lastName"
          />
        </div>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="text"
          className="border rounded p-2 py-3 w-full"
          placeholder="E-mail"
          value={inputs.email}
          onChange={handleChangeInputs}
          name="email"
        />
      </div>

      {!isSignIn && (
        <div className="my-3 flex justify-between text-sm">
          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="Phone"
            value={inputs.phone}
            onChange={handleChangeInputs}
            name="phone"
          />

          <input
            type="text"
            className="border rounded p-2 py-3 w-[49%]"
            placeholder="City"
            value={inputs.city}
            onChange={handleChangeInputs}
            name="city"
          />
        </div>
      )}

      <div className="my-3 flex justify-between text-sm">
        <input
          type="password"
          className="border rounded p-2 py-3 w-full"
          placeholder="Passowrd"
          value={inputs.password}
          onChange={handleChangeInputs}
        />
      </div>
    </div>
  );
};
