import { dtMoneyUrl } from "@/api";
import { LoginFormData } from "../screens/Login/components/Form";
import { IRegister, IUser } from "@/types/user";
import { RegisterFormData } from "@/screens/Register/components/Form";

export const authenticated = async (
  userData: LoginFormData,
): Promise<IUser> => {
  const { data } = await dtMoneyUrl.post<IUser>("/auth/login", userData);

  return data;
};

export const register = async (userData: IRegister): Promise<IUser> => {
  const { data } = await dtMoneyUrl.post("/auth/register", userData);

  return data;
};
