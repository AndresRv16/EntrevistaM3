import axios from "axios";

const api = axios.create({
  baseURL: "https://6a14ec0791ff9a63de072420.mockapi.io/issues"
});

export default api;