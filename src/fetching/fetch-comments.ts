import axios from 'axios';

import type { Comment } from '../types';

import { config } from '../config/config';

const { hostname } = config;

const fetchComments = async (id: string) => {
  try {
    const { data } = await axios.post(`${hostname}/api/game/reviews`, { id });

    return data as Comment[];
  } catch (error) {
    return null;
  }
};

export { fetchComments };
