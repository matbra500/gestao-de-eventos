import axios from "axios";

const api = axios.create({
  baseURL: "https://gestao-de-eventos.herokuapp.com",
});

export default api;