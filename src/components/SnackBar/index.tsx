import React from "react";
import { View, Text } from "react-native";
import { useSnackBarContext } from "@/context/snackbar.context";
import clsx from "clsx";

// import { Container } from './styles';

export const SnackBar: React.FC = () => {
  const { type, message } = useSnackBarContext();
  if (!message || !type) return <></>;
  return (
    <View
      className={clsx(
        "p-2 absolute bottom-10 self-center w-[90%] h-[50px] rounded-xl  items-center justify-center z-10",
        type === "SUCCESS"
          ? "bg-accent-brand-background-primary"
          : "bg-accent-red-background-primary",
      )}
    >
      <Text className="text-base text-center text-white">{message}</Text>
    </View>
  );
};
