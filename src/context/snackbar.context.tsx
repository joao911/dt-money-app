import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";

export type SnackBarMessageType = "ERROR" | "SUCCESS";

interface NotifyMessageParams {
  message: string | null;
  type: SnackBarMessageType | null;
}

export type SnackBarContextType = {
  message: string | null;
  type: SnackBarMessageType | null;
  notifyMessage: (params: NotifyMessageParams) => void;
};

const SnackbarContext = createContext<SnackBarContextType>(
  {} as SnackBarContextType,
);

export const SnackBarContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<SnackBarMessageType | null>(null);

  const notifyMessage = ({ message, type }: NotifyMessageParams) => {
    setMessage(message);
    setType(type);
    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, 3000);
  };
  return (
    <SnackbarContext.Provider value={{ message, type, notifyMessage }}>
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackBarContext = () => {
  return useContext(SnackbarContext);
};
