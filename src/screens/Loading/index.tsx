import { useAuthContext } from "@/context/auth.context";
import { colors } from "@/styles/colors";
import React, { useEffect } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface ILoadingProps {
  setLoading(value: boolean): void;
}

export const Loading = ({ setLoading }: ILoadingProps) => {
  const { restoreUserSession, handleLogout } = useAuthContext();

  useEffect(() => {
    const startApp = async () => {
      try {
        await restoreUserSession();
        const user = await restoreUserSession();
        console.log("user", user);
        if (!user) {
          await handleLogout();
        }
      } catch (error) {
        handleLogout();
        console.log("error", error);
      } finally {
        setLoading(false);
        console.log("loading", false);
      }
    };
    startApp();
  }, []);
  return (
    <SafeAreaView className="items-center justify-center flex-1 bg-background-primary">
      <>
        <Image
          className="h-[48px] w-[225px]"
          source={require("@/assets/Logo.png")}
        />
        <ActivityIndicator
          color={colors.white}
          className="mt-10"
          size="large"
        />
      </>
    </SafeAreaView>
  );
};
