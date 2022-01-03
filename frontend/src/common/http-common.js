import axios from "axios"

const API = process.env.REACT_APP_API;

export default axios.create({
    // baseURL: "http://localhost:8080/api",
    baseURL: API,
    headers: {
        "Content-type": "application/json"
      }
    });