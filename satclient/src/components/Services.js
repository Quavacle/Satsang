import Axios from 'axios';

const server = 'http://localhost:3000';

export const authRoute = () => {
  const token = localStorage.getItem('token');
  if (token) return true;
};
