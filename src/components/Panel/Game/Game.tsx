'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import axios from 'axios';

import type { Comment, GameBundle } from '../../../types';

import { GameStyled } from './Game.styles';
import { config } from '../../../config/config';
import { useSession } from '../../../hooks/use-session';
import { fetchScore } from '../../../fetching/fetch-score';
import { fetchComments } from '../../../fetching/fetch-comments';

const { hostname } = config;

type PanelProps = {
  gameBundle: GameBundle;
};

const Game: React.FC<PanelProps> = ({ gameBundle }) => {
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState<Comment[]>([]);
  const [comment, setComment] = useState<string>('');
  const ref = useRef<HTMLFormElement>(null);

  const { author, game } = gameBundle;

  const { session } = useSession();

  const handleSubmit = useCallback(async () => {
    if (!comment) {
      return null;
    }

    await axios.post(
      `${hostname}/api/game/comment`,
      { comment, game },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );

    clearComment();

    fetchComments(game.id).then((comments) => {
      setComments(comments);
    });
  }, [comment, game]);

  useEffect(() => {
    fetchScore(game.id).then(({ average, count }) => {
      setAverage(average);
      setCount(count);
    });

    fetchComments(game.id).then((comments) => {
      setComments(comments);
    });
  }, [game.id]);

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

  const handleScore = async (scoreValue: number) => {
    await axios.post(
      `${hostname}/api/game/rate`,
      { score: scoreValue, game },
      {
        headers: { Authorization: `Bearer ${session.accessToken}` },
      }
    );

    fetchScore(game.id).then(({ average, count }) => {
      setAverage(average);
      setCount(count);
    });
  };

  const handleCommentChange = (event) => setComment(event.target.value);
  const clearComment = () => setComment('');

  const commentClear = comment ? (
    <p className="clear" onClick={clearComment}>
      &#10005;
    </p>
  ) : null;

  const commentsComponent = comments.length !== 0 && (
    <div className="comments">
      <p>COMMENTS:</p>
      {comments.map(({ comment: value, user }, index) => {
        return (
          <div key={index}>
            <p>Author: {user.username}</p>
            <p>{value}</p>
          </div>
        );
      })}
    </div>
  );

  return (
    <GameStyled>
      <p>Title: {game.title}</p>
      <p>Description: {game.description}</p>
      <p>
        Score: {average} Count: {count}
      </p>
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
      <form ref={ref}>
        <p className="label">Comment</p>
        <div className="input-frame input-username">
          <input
            type="text"
            className="form-input"
            onChange={handleCommentChange}
            value={comment}
          />
          {commentClear}
        </div>
      </form>
      <button type="button" onClick={handleSubmit} className="submit-button">
        Post comment
      </button>
      {commentsComponent}
    </GameStyled>
  );
};

export { Game };
