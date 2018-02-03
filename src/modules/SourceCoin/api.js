import {apiData} from '../../tools/api';
import * as fetch from 'isomorphic-fetch';
import moment from 'moment';



export const fetchSource = (token, id, api) => {
    const auth = `JWT ${token}`
    const month = moment().subtract(30, 'days').format('YYYY-MM-DD')
    const limit = 60*24*31

    const options = {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': auth
      },
      method: 'GET',
    };
    return fetch(api + `?created_from=${month}&limit=${limit}&coin=${id}`, options);
};
export const fetchAuth = () => {
  const data = {
      username: 'admin',
      password: ']auA46\\S'
  };
  const options = {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    method: 'POST',
    body: JSON.stringify(data)
  };
  return fetch(apiData.auth, options);
};