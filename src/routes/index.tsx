import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { Login } from "../screens/Login";
import { Register } from "../screens/Register";
export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};
const NavigationRoutes = () => {
  const PublicStack = createStackNavigator<PublicStackParamList>();
  return (
    <NavigationContainer>
      <PublicStack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <PublicStack.Screen name="login" component={Login} />
        <PublicStack.Screen name="register" component={Register} />
      </PublicStack.Navigator>
    </NavigationContainer>
  );
};

export default NavigationRoutes;
