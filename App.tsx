import { AuthProvider } from "@/context/auth.context";

import "./src/styles/global.css";
import NavigationRoutes from "./src/routes";
import { SnackBar } from "@/components/SnackBar";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { BottomSheetProvider } from "@/context/bottomSheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthProvider>
          <BottomSheetProvider>
            <NavigationRoutes />;
            <SnackBar />
          </BottomSheetProvider>
        </AuthProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}
