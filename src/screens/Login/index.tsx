import { Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PublicStackParamList } from "@/routes/PublicRoutes";

export const Login = () => {
  const navigation = useNavigation<StackNavigationProp<PublicStackParamList>>();
  return (
    <View className="items-center justify-center flex-1 bg-background-primary">
      <Text className="text-base text-center text-white">eu sou login</Text>
      <Text
        className="absolute text-base text-center text-gray-500 bottom-10"
        onPress={() => navigation.navigate("register")}
      >
        register
      </Text>
    </View>
  );
};
