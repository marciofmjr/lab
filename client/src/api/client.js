import axios from "axios";
import session from "@/services/session";
import querify from "@/services/querify";

export default {
  get(path, query = {}) {
    return this.request("get", path, {}, query);
  },

  delete(path) {
    return this.request("delete", path);
  },

  create(path, data) {
    return this.request("post", path, data);
  },

  update(path, data) {
    return this.request("put", path + data.id, data);
  },

  save(path, data) {
    if (data.id === 0 || data.id === "0") {
      delete data.id;
    }
    return data && data.id && data.id.length > 0
      ? this.update(path, data)
      : this.create(path, data);
  },

  request(method, path, data = {}, query = {}) {
    if (!method) {
      throw "Client request method: 'method' param not especified";
    }

    if (!path) {
      throw "Client request method: 'path' param not especified";
    }

    const headers = {};
    const token = session.getToken();

    if (token) {
      headers.Authorization = `Bearer ${token}`;
    }

    const url = process.env.VUE_APP_API_URI + path + querify(query);

    return axios({
      method: method,
      url: url,
      data: data,
      headers: headers
    })
      .then(function(response) {
        return response.data;
      })
      .catch(function(error) {
        throw error;
      });
  }
};
