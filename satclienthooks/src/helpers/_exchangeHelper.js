import Axios from 'axios';
import { useContext } from 'react';

import { AlertContext } from '../providers/alertProvider';
const server = process.env.REACT_APP_LOCAL_DB;
const apiKey = process.env.REACT_APP_API_KEY;
const token = localStorage.getItem('token');
const tokenHeader = 'fix me';
// Book Exchanging

const requestInstance = (instance) => {
  Axios.put(
    server + '/instances/' + instance + '/request',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

const acceptRequest = (id, user) => {
  console.log(user);
  Axios.put(
    server + '/instances/' + id + '/accept',
    {
      acceptedUser: user,
    },
    {
      headers: {
        authorization: token,
      },
    }
  )
    .then((res) => {
      const status = res.status;
      return status;
    })
    .catch((err) => {
      console.error(err);
    });
};

const denyRequest = (instance) => {
  const { id } = instance._id;
  Axios.put(server + '/instances/' + id + '/deny', {}, tokenHeader()).then(
    (res) => {
      const status = res.status;
      return status;
    }
  );
};

const returnBook = (id) => {
  Axios.put(
    server + '/instances/' + id + '/return',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

const acceptReturn = (id) => {
  Axios.put(
    server + '/instances/' + id + '/accept_return',
    {},
    {
      headers: {
        authorization: token,
      },
    }
  ).then((res) => {
    const status = res.status;
    return status;
  });
};

export {
  requestInstance,
  acceptRequest,
  denyRequest,
  returnBook,
  acceptReturn,
};
