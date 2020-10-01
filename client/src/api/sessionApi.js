import client from "./client";
var url = "sessions/";

export default {
  create(data) {
    return client.create(url, data);
  }
};
