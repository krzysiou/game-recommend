type User = {
  id: string;
  username: string;
  password: string;
};

type Game = {
  id: string;
  title: string;
  description: string;
};

type Comment = {
  comment: string;
  user: User;
};

type GameBundle = {
  author: User;
  game: Game;
};

export type { User, Game, Comment, GameBundle };
