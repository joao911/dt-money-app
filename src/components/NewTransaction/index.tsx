import { z } from "zod";
import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { View, TouchableOpacity, Text, TextInput } from "react-native";

import { colors } from "@/styles/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";

const transactionSchema = z.object({
  description: z.string().min(5, "Descrição obrigatória"),
  category: z.string().min(5, "Categoria obrigatória"),
  price: z.string().min(1, "Preço obrigatório"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
export const NewTransaction = () => {
  const { closeBottomSheet } = useBottomSheetContext();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      category: "",
      price: "",
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
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
                  placeholder="Descrição"
                  placeholderTextColor={colors.gray[600]}
                  onChangeText={onChange}
                  value={value}
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-sm pl-4"
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
            name="price"
            render={({ field: { onChange, value } }) => {
              const handlePriceChange = (text: string) => {
                const numbers = text.replace(/\D/g, "");

                const amount = Number(numbers) / 100;

                const formatted = amount.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                });

                onChange(formatted);
              };
              return (
                <TextInput
                  placeholder="Preço"
                  placeholderTextColor={colors.gray[600]}
                  onChangeText={handlePriceChange}
                  value={value}
                  keyboardType="numeric"
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-sm pl-4"
                />
              );
            }}
          />
          {errors.price && (
            <View className="flex-row items-center ">
              <MaterialIcons
                name="error-outline"
                size={16}
                color={colors["accent-red"]}
                className="mt-2 mr-2"
              />
              <Text className="mt-2 text-sm text-accent-red">
                {errors?.price?.message}
              </Text>
            </View>
          )}
        </View>
        <View>
          <Controller
            control={control}
            name="category"
            render={({ field: { onChange, value } }) => {
              return (
                <TextInput
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-sm pl-4"
                  placeholder="Categoria"
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
                {errors.category?.message}
              </Text>
            </View>
          )}
        </View>
        <View className="flex-row gap-4">
          <TouchableOpacity className="flex-row items-center justify-center h-12 gap-2 mt-2 w-[48%] bg-background-tertiary">
            <MaterialIcons
              name="arrow-circle-up"
              size={20}
              color={colors["accent-brand"]}
              className="mr-2 "
            />
            <Text className="text-gray-400">Entrada</Text>
          </TouchableOpacity>
          <TouchableOpacity className="flex-row items-center justify-center h-12 gap-2 mt-2 w-[48%] bg-background-tertiary">
            <MaterialIcons
              name="arrow-circle-down"
              size={20}
              color={colors["accent-red"]}
              className="mr-2 "
            />
            <Text className="text-gray-400">Saída</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-accent-brand w-full items-center justify-center h-[50px] rounded-xl mt-4"
        >
          <Text className="text-sm font-bold text-white">Salvar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
