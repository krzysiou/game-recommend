'use client';

import React from 'react';

import { NotFoundStyled } from './NotFound.styles';

const NotFound: React.FC = () => {
  return (
    <NotFoundStyled>
      <p>404 page not found . . .</p>
    </NotFoundStyled>
  );
};

export { NotFound };
