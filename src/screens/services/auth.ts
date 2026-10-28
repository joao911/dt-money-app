import { dtMoneyUrl } from "@/api";
import { LoginFormData } from "../Login/components/Form";
import { IUser } from "@/types/user";

export const authenticated = async (
  userData: LoginFormData,
): Promise<IUser> => {
  const { data } = await dtMoneyUrl.post<IUser>("/auth/login", {
    userData,
  });

  return data;
};
