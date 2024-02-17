import axios from "axios";

const axiosInstance = axios.create({
  // Local url for express
  // baseURL: "http://localhost:5000",

  //Deployed version of amazon api on render.com
  baseURL: "https://amazon-api-deploy-i2l0.onrender.com",
});

export { axiosInstance };
