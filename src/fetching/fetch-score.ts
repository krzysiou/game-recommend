import axios from 'axios';

import { config } from '../config/config';

const { hostname } = config;

const fetchScore = async (id: string) => {
  try {
    const { data } = await axios.post(`${hostname}/api/average`, { id });

    return data as number;
  } catch (error) {
    return 0 as number;
  }
};

export { fetchScore };
