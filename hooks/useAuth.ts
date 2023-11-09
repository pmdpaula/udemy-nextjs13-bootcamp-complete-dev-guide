import axios from 'axios';
import { deleteCookie } from 'cookies-next';
import { useContext } from 'react';

import { AuthenticationContext } from '../app/context/AuthContext';

interface SigninProps {
  email: string;
  password: string;
  handleClose: () => void;
}

interface SignupProps {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  handleClose: () => void;
}

const useAuth = () => {
  const { setAuthState } = useContext(AuthenticationContext);

  const signin = async ({ email, password, handleClose }: SigninProps) => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const response = await axios.post('/api/auth/signin', {
        email,
        password,
      });

      setAuthState({ data: response.data, error: null, loading: false });
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setAuthState({ data: null, error: err.response.data.errorMessage, loading: false });
    }
  };

  const signup = async ({
    email,
    password,
    firstName,
    lastName,
    phone,
    city,
    handleClose,
  }: SignupProps) => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const response = await axios.post('/api/auth/signup', {
        email,
        password,
        firstName,
        lastName,
        phone,
        city,
      });

      setAuthState({ data: response.data, error: null, loading: false });
      handleClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setAuthState({ data: null, error: err.response.data.errorMessage, loading: false });
    }
  };

  const signout = async () => {
    deleteCookie('jwt');

    setAuthState({ data: null, error: null, loading: false });
  };

  return {
    signin,
    signup,
    signout,
  };
};

export default useAuth;
