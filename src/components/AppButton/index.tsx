import {
  View,
  TouchableOpacity,
  TouchableOpacityProps,
  Text,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { colors } from "@/styles/colors";

type ButtonMode = "contained" | "outlined";
interface IAppButtonProps extends TouchableOpacityProps {
  mode?: ButtonMode;
  iconName?: keyof typeof MaterialIcons.glyphMap;
}
export const AppButton: React.FC<PropsWithChildren<IAppButtonProps>> = ({
  mode = "contained",
  iconName,
  children,
  ...rest
}) => {
  const isContained = mode === "contained";
  return (
    <TouchableOpacity
      {...rest}
      className={clsx(
        "w-full rounded-xl px-5 flex-row items-center h-button",
        iconName ? "justify-between" : "justify-center",
        {
          "bg-accent-brand text-white": isContained,
          "bg-none border-solid border-[1px] border-accent-brand text-accent-brand":
            !isContained,
        },
      )}
    >
      <Text
        className={clsx("text-base", {
          "text-white": isContained,
          "text-accent-brand": !isContained,
        })}
      >
        {children}
      </Text>
      {iconName && (
        <MaterialIcons
          name={iconName}
          size={24}
          color={isContained ? colors.white : colors["accent-brand"]}
        />
      )}
    </TouchableOpacity>
  );
};
