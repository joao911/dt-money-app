import { useCallback, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SystemBars } from "react-native-edge-to-edge";

import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";
import { useAuthContext } from "@/context/auth.context";
import { Loading } from "@/screens/Loading";

const NavigationRoutes = () => {
  const { user } = useAuthContext();
  const [loading, setLoading] = useState(true);

  const Router = useCallback(() => {
    if (loading) {
      return <Loading setLoading={setLoading} />;
    }
    if (!user) {
      return <PublicRoutes />;
    } else {
      return <PrivateRoutes />;
    }
  }, [user, loading]);

  return (
    <NavigationContainer>
      <SystemBars style="light" />
      <Router />
    </NavigationContainer>
  );
};

export default NavigationRoutes;
