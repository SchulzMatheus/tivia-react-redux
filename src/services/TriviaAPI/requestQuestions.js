const numberOfQuestions = 5;

const getQuestions = async (token) => {
  const URL = `https://opentdb.com/api.php?amount=${numberOfQuestions}&token=${token}`;
  const response = await fetch(URL);
  const data = await response.json();
  return data;
};

export default getQuestions;
