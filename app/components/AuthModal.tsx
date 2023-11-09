import { Alert, CircularProgress } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useContext, useEffect, useState } from 'react';

import { AuthModalInputs } from './AuthModalInputs';
import { SignUpDTO } from '../../dtos/SignUpDTO';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

interface AuthModalProps {
  isSignIn: boolean;
}

export const AuthModal = ({ isSignIn }: AuthModalProps) => {
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputs, setInputs] = useState<SignUpDTO>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    password: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { signin, signup } = useAuth();
  const { error, loading } = useContext(AuthenticationContext);

  function renderSignInOrSignOutContent(sigInContent: string, signOutContent: string) {
    return isSignIn ? sigInContent : signOutContent;
  }

  function handleChangeInputs(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setInputs({ ...inputs, [name]: value });
  }

  function handleClick() {
    if (isSignIn) {
      signin({ email: inputs.email, password: inputs.password, handleClose });
    }

    if (!isSignIn) {
      signup({ ...inputs, handleClose });
    }
  }

  useEffect(() => {
    if (isSignIn) {
      if (inputs.email && inputs.password) {
        setIsDisabled(false);
      }
    }

    if (!isSignIn) {
      if (
        inputs.firstName &&
        inputs.lastName &&
        inputs.email &&
        inputs.phone &&
        inputs.city &&
        inputs.password
      ) {
        setIsDisabled(false);
      }
    }
  }, [inputs]);

  return (
    <div>
      <button
        className={`${isSignIn && 'bg-blue-400 text-white'} border p-1 px-4 rounded mr-3`}
        onClick={handleOpen}
      >
        {renderSignInOrSignOutContent('Sign in', 'Sign up')}
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? (
            <div className="py-24 p-2 h-[600px] flex justify-center">
              <CircularProgress />
            </div>
          ) : (
            <div className="p-2 h-[600px]">
              {error && (
                <Alert
                  severity="error"
                  className="mb-4"
                >
                  {error}
                </Alert>
              )}

              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  {renderSignInOrSignOutContent('Sign in', 'Create an account')}
                </p>
              </div>

              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  {renderSignInOrSignOutContent(
                    'Log into to your account',
                    'Create your OpenTable account',
                  )}
                </h2>

                <AuthModalInputs
                  inputs={inputs}
                  handleChangeInputs={handleChangeInputs}
                  isSignIn={isSignIn}
                />

                <button
                  className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 mt-8 disabled:bg-gray-400 hover:bg-red-500"
                  disabled={isDisabled}
                  onClick={handleClick}
                >
                  {renderSignInOrSignOutContent('Sign in', 'Create an account')}
                </button>
              </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};
