import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";
import { useTransactionContext } from "@/context/transaction.context";
import { AppError } from "@/utils/AppError";
import { useEffect } from "react";
import { FlatList } from "react-native";

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
    <SafeAreaView className="flex-1 bg-background-secondary">
      <FlatList
        data={[]}
        renderItem={() => <></>}
        ListHeaderComponent={() => <></>}
      />
    </SafeAreaView>
  );
};
