import { View, Text, TouchableOpacity } from "react-native";
import { useAuthContext } from "@/context/auth.context";

export const Home = () => {
  const { user, handleLogout } = useAuthContext();

  return (
    <View>
      <TouchableOpacity onPress={() => handleLogout()}>Logout</TouchableOpacity>
      <Text>Home</Text>
    </View>
  );
};
