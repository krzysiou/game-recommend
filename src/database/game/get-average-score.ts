import { query } from '../query';

const getAverageParameters = (records) => {
  let score: number = 0;

  records.map((record) => {
    const rating = record.get('r').properties.rating;
    score += Number(rating);
  });

  const count = records.length;
  const average = score / count;

  return { average, count };
};

const getAverageScore = async (id: string) => {
  const result = await query(
    `MATCH (game:Game {id: '${id}'}) MATCH (user)-[r:RATED]->(game) RETURN r`
  );

  if (result.records.length === 0) {
    return { average: 0, count: 0 };
  }

  return getAverageParameters(result.records);
};

export { getAverageScore };
