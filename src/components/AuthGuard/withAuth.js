'use client'
import { getSafeUserFromCookie } from '@/utils/cookies';
// import { useAuth } from '../AuthGuard/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const withProtectedRoute = (WrappedComponent) => {
  // if cookie is not present, redirect to login page and if present not redirect to login page
  return (props) => {
    const router = useRouter();
    const token = getSafeUserFromCookie('token') || null;
    // get path
    const path = usePathname();
    useEffect(() => {
      // If the user is not authenticated, redirect to the login page
      if (!token) {
        router.push('/login');
      }
      if (token && path === '/login') {
        router.push('/');
      }
    }, [token, router]);

    // If the user is authenticated, render the WrappedComponent
    // Otherwise, render null while the redirection is in progress
    return token ? <WrappedComponent {...props} /> : null;
  };
};

export default withProtectedRoute;