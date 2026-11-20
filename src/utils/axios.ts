import { IUser } from "@/types/user";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AxiosInstance } from "axios";
import { config } from "zod";

export const addTokenToRequest = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(async (config) => {
    const userData = await AsyncStorage.getItem("dt-money-user");

    if (userData) {
      const { token } = JSON.parse(userData) as IUser;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  });
};
