import { query } from '../query';

const getAverageParameters = (records) => {
  let score: number = 0;

  records.map((record) => {
    const rating = record.get('r').properties.rating;
    score += Number(rating);
  });

  return score / records.length;
};

const getAverageScore = async (id: string) => {
  const result = await query(
    `MATCH (game:Game {id: '${id}'}) MATCH (user)-[r:RATED]->(game) RETURN r`
  );

  if (result.records.length === 0) {
    return undefined;
  }

  return getAverageParameters(result.records);
};

export { getAverageScore };
