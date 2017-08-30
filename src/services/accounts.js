import request from "request-promise-native";

import { apiUrl } from "../constants.js"

export default {

  login: (kerberos) => {
    return request({
      uri: apiUrl + "/users",
      method: "POST",
      json: true,
      body: {
        username: kerberos
      }
    });
  }

}
