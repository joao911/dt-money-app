import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/styles/colors";
import { ICreateTransaction } from "@/types/transaction";
import { View, TouchableOpacity, Text, TextInput } from "react-native";

import { useBottomSheetContext } from "@/context/bottomSheet.context";

const transactionSchema = z.object({
  description: z.string().min(5, "Descrição obrigatória"),
  category: z.string().min(5, "Categoria obrigatória"),
  price: z.string().min(5, "Preço obrigatório"),
});

export type LoginFormData = z.infer<typeof transactionSchema>;
export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      category: "",
      price: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log("data", data);
  };
  return (
    <View className="px-8 py-5">
      <TouchableOpacity
        className="flex-row items-center justify-between w-full "
        onPress={closeBottomSheet}
      >
        <Text className="text-xl font-bold text-white">Nova Transação</Text>
        <MaterialIcons name="close" size={20} color={colors.gray[700]} />
      </TouchableOpacity>
      <View className="mt-4">
        <View>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  className="w-full mt-4"
                  placeholder="Descrição"
                  placeholderTextColor={colors.gray[600]}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
          {errors.description && (
            <View className="flex-row items-center ">
              <MaterialIcons
                name="error-outline"
                size={16}
                color={colors["accent-red"]}
                className="mt-2 mr-2"
              />
              <Text className="mt-2 text-sm text-accent-red">
                {errors.description.message}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  className="w-full mt-4"
                  placeholder="Descrição"
                  placeholderTextColor={colors.gray[600]}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
          {errors.description && (
            <View className="flex-row items-center ">
              <MaterialIcons
                name="error-outline"
                size={16}
                color={colors["accent-red"]}
                className="mt-2 mr-2"
              />
              <Text className="mt-2 text-sm text-accent-red">
                {errors.description.message}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Controller
            control={control}
            name="description"
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-sm pl-4"
                  placeholder="Descrição"
                  placeholderTextColor={colors.gray[600]}
                  onChangeText={onChange}
                  value={value}
                />
              );
            }}
          />
          {errors.description && (
            <View className="flex-row items-center ">
              <MaterialIcons
                name="error-outline"
                size={16}
                color={colors["accent-red"]}
                className="mt-2 mr-2"
              />
              <Text className="mt-2 text-sm text-accent-red">
                {errors.description.message}
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
};
