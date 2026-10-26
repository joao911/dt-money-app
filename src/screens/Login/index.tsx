import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamList } from "@/routes/PublicRoutes";
import { DismissKeyboardView } from "@/components/DismissKeyboardView";
import { Form } from "./components/Form";

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();
  return (
    <DismissKeyboardView>
      <View className="flex-1 w-[82%] self-center">
        <Form />
      </View>
    </DismissKeyboardView>
  );
};
