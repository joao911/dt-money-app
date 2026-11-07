import { AuthProvider } from "@/context/auth.context";

import "./src/styles/global.css";
import NavigationRoutes from "./src/routes";
import { SnackBar } from "@/components/SnackBar";
import { SnackBarContextProvider } from "@/context/snackbar.context";

export default function App() {
  return (
    <SnackBarContextProvider>
      <AuthProvider>
        <NavigationRoutes />;
        <SnackBar />
      </AuthProvider>
    </SnackBarContextProvider>
  );
}
