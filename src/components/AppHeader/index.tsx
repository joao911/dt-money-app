import { View, Image, TouchableOpacity, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { useAuthContext } from "@/context/auth.context";

export const AppHeader = () => {
  const { handleLogout } = useAuthContext();

  return (
    <View className="flex-row items-center justify-between w-full p-8">
      <View>
        <Image
          className="h-[30px] w-[130px]"
          source={require("@/assets/Logo.png")}
        />
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center gap-2 mt-2"
        >
          <MaterialIcons name="logout" size={15} color={colors.gray[700]} />
          <Text className="text-base text-gray-700">Sair da conta</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity className="bg-accent-brand w-[130px] items-center justify-center h-[50px] rounded-xl ">
        <Text className="text-sm font-bold text-white">Nova Transação</Text>
      </TouchableOpacity>
    </View>
  );
};
