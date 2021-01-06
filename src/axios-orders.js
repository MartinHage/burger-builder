import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-builder-a8e85-default-rtdb.firebaseio.com/",
});

export default instance;
