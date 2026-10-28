import { LoginFormData } from "@/screens/Login/components/Form";
import { RegisterFormData } from "@/screens/Register/components/Form";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

type AuthContextType = {
  user: null;
  token: string | null;
  handleAuthenticate: (params: LoginFormData) => Promise<void>;
  handleRegister: (params: RegisterFormData) => Promise<void>;
  handleLogout: () => void;
};

export const AuthContext = createContext<AuthContextType>(
  {} as AuthContextType,
);

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [user, serUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);
  const handleAuthenticate = async (params: LoginFormData) => {};
  const handleRegister = async (params: RegisterFormData) => {};
  const handleLogout = () => {};
  return (
    <AuthContext.Provider
      value={{ user, token, handleAuthenticate, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  return context;
};
