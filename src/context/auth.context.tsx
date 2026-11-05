import {
  FC,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LoginFormData } from "@/screens/Login/components/Form";
import { RegisterFormData } from "@/screens/Register/components/Form";
import { authenticated, register } from "@/services/auth";
import { IRegister, IUser } from "@/types/user";

type AuthContextType = {
  user: IUser | null;
  handleAuthenticate: (params: LoginFormData) => Promise<void>;
  handleRegister: (params: IRegister) => Promise<void>;
  handleLogout: () => void;
  restoreUserSession: () => Promise<string | null>;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const handleAuthenticate = async (params: LoginFormData): Promise<void> => {
    const response = await authenticated(params);
    console.log("response login", response);
    if (response.user) {
      await AsyncStorage.setItem("dt-money-user", JSON.stringify(response));
      setUser(response);
    }
  };
  const handleRegister = async (params: IRegister) => {
    const response = await register(params);

    if (response.user) {
      await AsyncStorage.setItem("dt-money-user", JSON.stringify(response));
      setUser(response);
    }
    console.log("response register", response);
  };
  const handleLogout = () => {};

  const restoreUserSession = async () => {
    const user = await AsyncStorage.getItem("dt-money-user");
    if (user) {
      setUser(JSON.parse(user));
    }
    return user;
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        handleLogout,
        handleRegister,
        handleAuthenticate,
        restoreUserSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
