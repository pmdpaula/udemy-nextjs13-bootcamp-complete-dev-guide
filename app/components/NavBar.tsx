'use client';

import { CircularProgress } from '@mui/material';
import Link from 'next/link';
import { useContext } from 'react';

import { AuthModal } from './AuthModal';
import useAuth from '../../hooks/useAuth';
import { AuthenticationContext } from '../context/AuthContext';

export const NavBar = () => {
  const { data, loading } = useContext(AuthenticationContext);
  const { signout } = useAuth();

  return (
    <nav className="bg-white p-2 flex justify-between">
      <Link
        href="/"
        className="font-bold text-gray-700 text-2xl"
      >
        {' '}
        OpenTable{' '}
      </Link>
      <div>
        {loading ? (
          <div className="mr-8">
            <CircularProgress size={20} />
          </div>
        ) : (
          <div className="flex">
            {data ? (
              <button
                onClick={signout}
                className="bg-blue-400 text-white border p-1 px-4 rounded mr-3"
              >
                Sign out
              </button>
            ) : (
              <>
                <AuthModal isSignIn={true} />

                <AuthModal isSignIn={false} />
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
