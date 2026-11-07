import {} from "react-native";
import { useAuthContext } from "@/context/auth.context";
import { SafeAreaView } from "react-native-safe-area-context";
import { AppHeader } from "@/components/AppHeader";

export const Home = () => {
  return (
    <SafeAreaView className="flex-1 bg-background-primary">
      <AppHeader />
    </SafeAreaView>
  );
};
