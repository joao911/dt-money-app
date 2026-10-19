import { Home } from "@/screens/Home";
import { createStackNavigator } from "@react-navigation/stack";

export type PrivateStackParamList = {
  home: undefined;
};

const PrivateStack = createStackNavigator<PrivateStackParamList>();
export const PrivateRoutes = () => {
  return (
    <PrivateStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PrivateStack.Screen name="home" component={Home} />
    </PrivateStack.Navigator>
  );
};
