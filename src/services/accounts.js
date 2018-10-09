import request from 'request-promise-native';

import { apiUrl } from '../constants';

export default {

  login: kerberos => request({
    uri: `${apiUrl}/users`,
    method: 'POST',
    json: true,
    body: {
      username: kerberos,
    },
  }),

};
