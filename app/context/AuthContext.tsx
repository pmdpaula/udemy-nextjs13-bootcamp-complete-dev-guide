'use client';

import axios from 'axios';
import { getCookie } from 'cookies-next';
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from 'react';

import { UserDTO } from '../dtos/UserDTO';

interface AuthContextProps {
  children: ReactNode;
}

type State = {
  loading: boolean;
  data: UserDTO | null;
  error: string | null;
};

interface AuthState extends State {
  setAuthState: Dispatch<SetStateAction<State>>;
}

export const AuthenticationContext = createContext<AuthState>({
  loading: false,
  data: null,
  error: null,
  setAuthState: () => {},
});

const AuthContext = ({ children }: AuthContextProps) => {
  const [authState, setAuthState] = useState<State>({
    loading: true,
    data: null,
    error: null,
  });

  const fetchUser = async () => {
    setAuthState({ data: null, error: null, loading: true });

    try {
      const jwt = getCookie('jwt');

      if (!jwt) {
        return setAuthState({ data: null, error: null, loading: false });
      }

      const response = await axios.get('/api/auth/me', {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;

      setAuthState({ data: response.data, error: null, loading: false });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setAuthState({ data: null, error: err.response.data.errorMessage, loading: false });
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthenticationContext.Provider value={{ ...authState, setAuthState }}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export default AuthContext;
