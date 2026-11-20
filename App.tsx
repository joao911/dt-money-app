import { AuthProvider } from "@/context/auth.context";

import "./src/styles/global.css";
import NavigationRoutes from "./src/routes";
import { SnackBar } from "@/components/SnackBar";
import { SnackBarContextProvider } from "@/context/snackbar.context";
import { BottomSheetProvider } from "@/context/bottomSheet.context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { TransactionContextProvider } from "@/context/transaction.context";

export default function App() {
  return (
    <GestureHandlerRootView className="flex-1">
      <SnackBarContextProvider>
        <AuthProvider>
          <TransactionContextProvider>
            <BottomSheetProvider>
              <NavigationRoutes />;
              <SnackBar />
            </BottomSheetProvider>
          </TransactionContextProvider>
        </AuthProvider>
      </SnackBarContextProvider>
    </GestureHandlerRootView>
  );
}
