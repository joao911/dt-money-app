import { AppError } from "@/utils/AppError";
import axios from "axios";
import { Platform } from "react-native";

const baseUrl = Platform.select({
  ios: "http://localhost:3001",
  android: "http://10.0.2.2:3001",
});

export const dtMoneyUrl = axios.create({
  baseURL: baseUrl,
});

dtMoneyUrl.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.data) {
      return Promise.reject(new AppError(error.response.data.message));
    } else {
      return Promise.reject(new AppError("Falha na conexão com o servidor"));
    }
  },
);
