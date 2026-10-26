import { useKeyBoardVisible } from "@/utils/useKeyBoardVisible";
import { View, Image } from "react-native";

export const AuthHeader = () => {
  const keyBoardVisible = useKeyBoardVisible();

  if (keyBoardVisible) {
    return <></>;
  }

  return (
    <View className="items-center justify-center w-full min-h-40">
      <Image
        source={require("@/assets/Logo.png")}
        className="h-[48px] w-[255]"
      />
    </View>
  );
};
