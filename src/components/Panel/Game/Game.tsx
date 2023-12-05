'use client';

import React from 'react';

import type { GameBundle } from '../../../types';

import { GameStyled } from './Game.styles';

type PanelProps = {
  gameBundle: GameBundle;
};

const Game: React.FC<PanelProps> = ({ gameBundle }) => {
  const { author, game } = gameBundle;

  return (
    <GameStyled>
      <h3>Title: {game.title}</h3>
      <h5>Description: {game.description}</h5>
      <p>Added by: {author.username}</p>
    </GameStyled>
  );
};

export { Game };
