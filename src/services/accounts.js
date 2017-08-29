import request from "request-promise-native";

import { apiUrl } from "../constants.js"

export default {

  // both username and password fields are required
  // but only username is used

  login: (kerberos) => {
    return request({
      uri: apiUrl + "/",
      method: "POST",
      json: true,
      body: {
        username: kerberos,
        password: "password"
      }
    });
  },

  logout: () => {
    return request({
      uri: apiUrl + "/",
      method: "POST",
      json: true,
      body: {
        username: "",
        password: "password"
      }
    });
  }

}
