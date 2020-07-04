import Axios from 'axios';

const server = 'http://localhost:3000';

export const authRoute = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
};

export const verifyToken = async () => {
  const token = localStorage.getItem('token');
  console.log(`Token in React SErvices: ${token}`);
  const response = await Axios.post('http://localhost:3000/verify', token, {
    headers: { authorization: `Bearer ${token}` },
  });

  const isValid = await response;
  return isValid;
};
