import axios from "apisauce";

const api = axios.create({
  baseURL: "https://backendproj1.herokuapp.com"
});

api.addResponseTransform(response => {
  if (!response.ok) throw response;
});

export default api;
