import axios from "axios";

const ApiManager = axios.create({
    baseURL: 'https://e4cb-92-40-213-36.ngrok-free.app/api',
    responseType: 'json',
})

export default ApiManager;