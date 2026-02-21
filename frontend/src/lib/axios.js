import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://linkedin-2y5l.onrender.com/api/v1" : true,
});