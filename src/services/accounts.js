import request from "request-promise-native";

import { apiUrl } from "../constants.js"

export default {

  login: (username, password) => {
    return request({
      uri: apiUrl + "/",
      method: "POST",
      json: true,
      body: {
        username: username,
        password: password
      }
    });
  }

}
