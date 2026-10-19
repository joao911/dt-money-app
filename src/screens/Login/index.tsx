import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamList } from "../../routes";

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();
  return (
    <View className="items-center justify-center">
      <Text>login</Text>
      <Text onPress={() => navigation.navigate("register")}>register</Text>
    </View>
  );
};
