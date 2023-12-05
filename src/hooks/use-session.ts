'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import axios from 'axios';

import { config } from '../config/config';

const { hostname } = config;

type Session = {
  id: string;
  accessToken: string;
  expire: number;
};

const COOKIE_NAME = 'session';

const useSession = () => {
  const [session, setSession] = useState<Session>(null);
  const [hasSession, setHasSession] = useState<boolean>(false);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const sessionCookie = Cookies.get(COOKIE_NAME);

    if (sessionCookie) {
      setHasSession(true);
      setSession(JSON.parse(sessionCookie));

      return;
    }

    setHasSession(false);
    setSession(null);
  }, [pathname]);

  const register = useCallback(
    async (username: string, password: string) => {
      if (!username || !password) {
        return null;
      }

      const { data } = await axios.post<Session>(`${hostname}/api/register`, {
        username,
        password,
      });

      await Cookies.set(COOKIE_NAME, JSON.stringify(data), {
        expires: data.expire,
      });

      router.push('/panel');
    },
    [router]
  );

  const login = useCallback(
    async (username: string, password: string) => {
      if (!username || !password) {
        return null;
      }
      const { data } = await axios.post<Session>(`${hostname}/api/login`, {
        username,
        password,
      });

      await Cookies.set(COOKIE_NAME, JSON.stringify(data), {
        expires: data.expire,
      });

      router.push('/panel');
    },
    [router]
  );

  const logout = useCallback(async () => {
    await Cookies.remove(COOKIE_NAME);

    router.push('/login');
  }, [router]);

  return {
    session,
    hasSession,
    register,
    login,
    logout,
  };
};

export { useSession, COOKIE_NAME, type Session };
