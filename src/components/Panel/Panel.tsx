'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import type { GameBundle } from '../../types';

import { PanelStyled } from './Panel.styles';
import { useSession } from '../../hooks/use-session';
import { Game } from './Game/Game';
import { fetchGameBundles } from '../../fetching/fetch-games';
import { config } from '../../config/config';

const { hostname } = config;

const Panel: React.FC = () => {
  const [gameBundles, setGameBundles] = useState<GameBundle[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const ref = useRef<HTMLFormElement>(null);

  const { session, logout } = useSession();

  useEffect(() => {
    fetchGameBundles().then((bundles) => setGameBundles(bundles));
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!title || !description) {
      return null;
    }

    await axios.post(
      `${hostname}/api/game/create`,
      { title, description },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );

    const bundles = await fetchGameBundles();

    setGameBundles(bundles);
  }, [description, title]);

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
  }, [handleSubmit]);

  const handleTitleChange = (event) => setTitle(event.target.value);
  const handleDescriptionChange = (event) => setDescription(event.target.value);

  const clearTitle = () => setTitle('');
  const clearDescription = () => setDescription('');

  const usernameClear = title ? (
    <p className="clear" onClick={clearTitle}>
      &#10005;
    </p>
  ) : null;

  const passwordClear = description ? (
    <p className="clear" onClick={clearDescription}>
      &#10005;
    </p>
  ) : null;

  const gamesComponent =
    gameBundles.length !== 0 &&
    gameBundles.map((gameBundle) => (
      <Game key={gameBundle.game.id} gameBundle={gameBundle} />
    ));

  return (
    <PanelStyled>
      <button type="button" onClick={logout} className="logout-button">
        Log out
      </button>
      <form ref={ref}>
        <p className="label">Game title</p>
        <div className="input-frame input-username">
          <input
            type="text"
            className="form-input"
            onChange={handleTitleChange}
            value={title}
          />
          {usernameClear}
        </div>
        <p className="label">Description</p>
        <div className="input-frame input-password">
          <input
            type="text"
            className="form-input"
            onChange={handleDescriptionChange}
            value={description}
          />
          {passwordClear}
        </div>
      </form>
      <button type="button" onClick={handleSubmit} className="submit-button">
        Add
      </button>
      {gamesComponent}
    </PanelStyled>
  );
};

export { Panel };
