import { Login } from "@/screens/Login";
import { Register } from "@/screens/Register";
import { createStackNavigator } from "@react-navigation/stack";

export type PublicStackParamList = {
  login: undefined;
  register: undefined;
};

const PublicStack = createStackNavigator<PublicStackParamList>();

export const PublicRoutes = () => {
  return (
    <PublicStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <PublicStack.Screen name="login" component={Login} />
      <PublicStack.Screen name="register" component={Register} />
    </PublicStack.Navigator>
  );
};
