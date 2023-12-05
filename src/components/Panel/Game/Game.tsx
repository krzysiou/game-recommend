'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import type { GameBundle } from '../../../types';

import { GameStyled } from './Game.styles';
import { config } from '../../../config/config';
import { useSession } from '../../../hooks/use-session';
import { fetchScore } from '../../../fetching/fetch-score';

const { hostname } = config;

type PanelProps = {
  gameBundle: GameBundle;
};

const Game: React.FC<PanelProps> = ({ gameBundle }) => {
  const [score, setScore] = useState(0);

  const { author, game } = gameBundle;

  const { session } = useSession();

  useEffect(() => {
    fetchScore(game.id).then((result) => setScore(result));
  }, [game.id]);

  const handleScore = async (scoreValue: number) => {
    await axios.post(
      `${hostname}/api/rate`,
      { score: scoreValue, game },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );

    fetchScore(game.id).then((result) => setScore(result));
  };

  return (
    <GameStyled>
      <p>Title: {game.title}</p>
      <p>Description: {game.description}</p>
      <p>Score: {score}</p>
      <p>Added by: {author.username}</p>
      <button
        type="button"
        onClick={() => handleScore(1)}
        className="submit-button"
      >
        1
      </button>
      <button
        type="button"
        onClick={() => handleScore(2)}
        className="submit-button"
      >
        2
      </button>
      <button
        type="button"
        onClick={() => handleScore(3)}
        className="submit-button"
      >
        3
      </button>
      <button
        type="button"
        onClick={() => handleScore(4)}
        className="submit-button"
      >
        4
      </button>
      <button
        type="button"
        onClick={() => handleScore(5)}
        className="submit-button"
      >
        5
      </button>
    </GameStyled>
  );
};

export { Game };
