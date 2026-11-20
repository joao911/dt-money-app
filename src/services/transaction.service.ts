import { dtMoneyUrl } from "@/api";
import { ICreateTransaction } from "@/types/transaction";
import { ITransactionCategories } from "@/types/transactionCategories";

export const getTransactionCategories = async (): Promise<
  ITransactionCategories[]
> => {
  const { data } = await dtMoneyUrl.get<ITransactionCategories[]>(
    "/transaction/categories",
  );
  return data;
};

export const createTransaction = async (transaction: ICreateTransaction) => {
  await dtMoneyUrl.post("/transaction", transaction);
};
