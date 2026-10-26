import { useRef, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { clsx } from "clsx";
import { Control, FieldValues, Path, Controller } from "react-hook-form";
import { colors } from "@/styles/colors";
interface InputProps<T extends FieldValues> extends TextInputProps {
  control: Control<T>;
  name: Path<T>;
  leftIconName?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
}

export const Input = <T extends FieldValues>({
  control,
  name,
  leftIconName,
  label,
  secureTextEntry,
  ...rest
}: InputProps<T>) => {
  const [showText, setShowText] = useState(secureTextEntry);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const checkFocus = () => {
    if (inputRef.current) {
      setIsFocused(Boolean(inputRef.current.isFocused()));
    }
  };
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value } }) => {
        return (
          <View className="w-full mt-4">
            {label && (
              <Text
                className={clsx(
                  "mb-2 mt-3 text-base",
                  isFocused ? "text-accent-brand" : "text-gray-600",
                )}
              >
                {label}
              </Text>
            )}
            <TouchableOpacity className="flex-row items-center justify-between border-solid border-b-[1px] border-gray-600 px-3 py-2 h-16">
              {leftIconName && (
                <MaterialIcons
                  name={leftIconName}
                  size={24}
                  color={isFocused ? colors["accent-brand"] : colors.gray[600]}
                  className="mr-2"
                />
              )}
              <TextInput
                {...rest}
                placeholderTextColor={colors.gray[600]}
                value={value}
                onChangeText={onChange}
                className="flex-1 text-base text-gray-500"
                ref={inputRef}
                onFocus={checkFocus}
                onEndEditing={checkFocus}
                secureTextEntry={showText}
              />
              {secureTextEntry && (
                <TouchableOpacity onPress={() => setShowText(!showText)}>
                  <MaterialIcons
                    name={showText ? "visibility" : "visibility-off"}
                    size={24}
                    color={colors.gray[600]}
                  />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          </View>
        );
      }}
    />
  );
};
