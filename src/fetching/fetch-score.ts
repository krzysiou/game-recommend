import axios from 'axios';

import { config } from '../config/config';

const { hostname } = config;

type AverageData = {
  average: number;
  count: number;
};

const fetchScore = async (id: string) => {
  try {
    const { data } = await axios.post(`${hostname}/api/average`, { id });

    return data as AverageData;
  } catch (error) {
    return { average: 0, count: 0 } as AverageData;
  }
};

export { fetchScore };
