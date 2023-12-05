'use client';

import React from 'react';
import Link from 'next/link';

import { FrontpageStyled } from './Frontpage.styles';

const Frontpage: React.FC = () => {
  return (
    <FrontpageStyled>
      <p className="hero">Frontpage</p>
      <div className="links">
        <Link href={'/login'}>Sign in</Link>
        <Link href={'/register'}>Sign up</Link>
      </div>
    </FrontpageStyled>
  );
};

export { Frontpage };
