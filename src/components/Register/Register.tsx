'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { RegisterStyled } from './Register.styles';
import { useSession } from '../../hooks/use-session';

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const ref = useRef<HTMLFormElement>(null);

  const { register } = useSession();

  const handleSubmit = useCallback(async () => {
    await register(username, password);
  }, [password, register, username]);

  useEffect(() => {
    const handleKeyboardInput = (event: KeyboardEvent) => {
      if (
        ref.current &&
        ref.current.contains(event.target as Node) &&
        event.code === 'Enter'
      ) {
        handleSubmit();
      }
    };

    document.addEventListener('keydown', handleKeyboardInput);

    return () => {
      document.removeEventListener('keydown', handleKeyboardInput);
    };
  }, [handleSubmit, password, username]);

  const handleUsernameChange = (event) => setUsername(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const clearUsername = () => setUsername('');
  const clearPassword = () => setPassword('');

  const usernameClear = username ? (
    <p className="clear" onClick={clearUsername}>
      &#10005;
    </p>
  ) : null;

  const passwordClear = password ? (
    <p className="clear" onClick={clearPassword}>
      &#10005;
    </p>
  ) : null;

  return (
    <RegisterStyled>
      <p className="hero">Sign up</p>
      <form ref={ref}>
        <p className="label">Username</p>
        <div className="input-frame input-username">
          <input
            type="text"
            className="form-input"
            onChange={handleUsernameChange}
            value={username}
          />
          {usernameClear}
        </div>
        <p className="label">Password</p>
        <div className="input-frame input-password">
          <input
            type="password"
            className="form-input"
            onChange={handlePasswordChange}
            value={password}
          />
          {passwordClear}
        </div>
      </form>
      <button type="button" onClick={handleSubmit} className="submit-button">
        Sign in
      </button>
      <Link href="/register" className="redirect">
        Sign in here
      </Link>
    </RegisterStyled>
  );
};

export { Register };
