import { AuthHeader } from "@/components/AuthHeader";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { Text, View } from "react-native";
import { Form } from "./components/Form";

export const Register = () => {
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <AuthHeader />
        <Form />
      </View>
    </DismissKeyboardView>
  );
};
