import { View } from "react-native";

import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { Form } from "./components/Form";
import { AuthHeader } from "@/components/AuthHeader";

export const Login = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <Form />
      </View>
    </DismissKeyboardView>
  );
};
