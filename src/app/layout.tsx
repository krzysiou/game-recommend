'use client';

import React from 'react';

import { StyledComponentsRegistry } from './registry';
import { Reset } from '../../public/styles/Reset.styles';
import { Globals } from '../../public/styles/Globals.styles';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <head>
        <title>file-io</title>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <html lang="en">
        <StyledComponentsRegistry>
          <Reset />
          <Globals />
          <body>{children}</body>
        </StyledComponentsRegistry>
      </html>
    </>
  );
}
