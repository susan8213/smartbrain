import axios from "axios";

export default class Api {
  constructor() {
    this.api_token = null;
    this.api_url = "http://localhost:3000";
  }

  init = () => {
    // this.api_token = getCookie("ACCESS_TOKEN");

    let headers = {
      Accept: "application/json"
    };

    if (this.api_token) {
      headers.Authorization = `Bearer ${this.api_token}`;
    }

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers
    });

    return this.client;
  };

  signIn = data => {
    return this.init().post("/users/signin", data);
  };

  signUp = data => {
    return this.init().post("/users/register", data);
  };

  increaseEntry = user => {
    return this.init().put(`/users/${user.id}/image`);
  };
}
