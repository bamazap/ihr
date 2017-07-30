import request from "request-promise-native";

import php_crud_api_transform from
  "../../vendor/mevdschee/php-crud-api/lib/php_crud_api_transform.js";

import { apiUrl } from "../constants.js"

export default {

  addPerson: (firstname, lastname) => {
    return request({
      uri: apiUrl + "/people",
      method: "POST",
      json: true,
      body: {
        firstname: firstname,
        lastname: lastname
      }
    });
  },

  deletePerson: (id) => {
    return request({
      uri: apiUrl + "/people/" + id,
      method: "DELETE",
      json: true
    });
  },

  getPeople: () => {
    return request({
      uri: apiUrl + "/people",
      method: "GET",
      json: true,
      transform: (res) => php_crud_api_transform(res)["people"]
    });
  }
}
