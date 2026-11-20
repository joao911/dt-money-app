import { ITransactionCategories } from "@/types/transactionCategories";
import {
  createContext,
  FC,
  PropsWithChildren,
  useContext,
  useState,
} from "react";
import {
  getTransactionCategories,
  createTransaction as createTransactionService,
} from "@/services/transaction.service";
import { ICreateTransaction } from "@/types/transaction";
export type TransactionContextType = {
  fetchCategories: () => Promise<void>;
  categories: ITransactionCategories[];
  createTransaction: (transaction: ICreateTransaction) => Promise<void>;
};

export const TransactionContext = createContext({} as TransactionContextType);

export const TransactionContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const [categories, setCategories] = useState<ITransactionCategories[]>([]);
  const fetchCategories = async () => {
    const categoriesResponse = await getTransactionCategories();
    setCategories(categoriesResponse);
  };

  const createTransaction = async (transaction: ICreateTransaction) => {
    await createTransactionService(transaction);
  };
  return (
    <TransactionContext.Provider
      value={{ categories, fetchCategories, createTransaction }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransactionContext = () => {
  return useContext(TransactionContext);
};
