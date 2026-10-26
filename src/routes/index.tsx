import { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SystemBars } from "react-native-edge-to-edge";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

const NavigationRoutes = () => {
  const [user, setUser] = useState(null);

  const Router = useCallback(() => {
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Router />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
