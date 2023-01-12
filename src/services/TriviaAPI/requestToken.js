const URL = 'https://opentdb.com/api_token.php?command=request';

const getToken = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  localStorage.setItem('token', data.token);
  return data.response_code;
};

export default getToken;
