import axios from 'axios';

import type { GameBundle } from '../types';

import { config } from '../config/config';

const { hostname } = config;

const fetchGameBundles = async () => {
  try {
    const { data } = await axios.get(`${hostname}/api/game/get`);

    return data as GameBundle[];
  } catch (error) {
    return [] as GameBundle[];
  }
};

export { fetchGameBundles };
