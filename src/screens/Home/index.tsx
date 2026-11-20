import {} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";
import { useTransactionContext } from "@/context/transaction.context";
import { AppError } from "@/utils/AppError";
import { useEffect } from "react";

export const Home = () => {
  const { fetchCategories } = useTransactionContext();
  const handleCategories = async () => {
    try {
      await fetchCategories();
    } catch (error) {
      console.log("error");
    }
  };

  useEffect(() => {
    (async () => {
      await handleCategories();
    })();
  }, []);
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  );
};
