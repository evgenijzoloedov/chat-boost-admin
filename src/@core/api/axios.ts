import axios from "axios";


// const BASE_URL = "http://127.0.0.1:8000/"
const BASE_URL = "https://6a8c-2a01-4f9-3b-47ef-00-7.ngrok-free.app"

export const api = axios.create({
  baseURL:BASE_URL
})


