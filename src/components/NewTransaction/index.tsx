import { z } from "zod";
import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";

import { colors } from "@/styles/colors";
import { useBottomSheetContext } from "@/context/bottomSheet.context";
import { useState } from "react";
import clsx from "clsx";
import { SelectCategoryModal } from "../SelectCategoryModal";
import { useSnackBarContext } from "@/context/snackbar.context";
import { useTransactionContext } from "@/context/transaction.context";

const transactionSchema = z.object({
  description: z.string().min(5, "Descrição obrigatória"),

  price: z.string().min(1, "Preço obrigatório"),
});

export type TransactionFormData = z.infer<typeof transactionSchema>;
export const NewTransaction = () => {
  const { notifyMessage } = useSnackBarContext();
  const { closeBottomSheet } = useBottomSheetContext();
  const { createTransaction } = useTransactionContext();

  const [loading, setLoading] = useState(false);
  const [typeId, setTypeId] = useState(0);
  const [categoryId, setCategoryId] = useState(0);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormData>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      description: "",
      price: "",
    },
  });

  const onSubmit = async (data: TransactionFormData) => {
    const price = Number(data.price.replace(/\D/g, ""));

    console.log(price);
    if (categoryId === 0) {
      notifyMessage({
        message: "Selecione uma categoria",
        type: "ERROR",
      });
    } else {
      try {
        setLoading(true);
        await createTransaction({
          description: data.description,
          value: price,
          categoryId,
          typeId,
        });
        closeBottomSheet();
        notifyMessage({
          message: "Transação criada com sucesso",
          type: "SUCCESS",
        });
      } catch (error) {
        console.log("erro ao criar transação", error);
        notifyMessage({
          message: "Erro ao criar transação",
          type: "ERROR",
        });
      } finally {
        setLoading(false);
      }
    }
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
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
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
                  className="text-white text-lg h-[50px] bg-background-primary my-2 rounded-md pl-4"
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
        <SelectCategoryModal
          selectedCategory={categoryId}
          onSelect={setCategoryId}
        />
        <View className="flex-row gap-4 mt-4">
          <TouchableOpacity
            onPress={() => setTypeId(1)}
            className={clsx(
              "flex-row items-center justify-center h-12 gap-2 mt-2 w-[48%] ",
              typeId === 1
                ? "bg-accent-brand-background-primary"
                : "bg-background-tertiary",
            )}
          >
            <MaterialIcons
              name="arrow-circle-up"
              size={20}
              color={typeId === 1 ? colors.white : colors["accent-brand"]}
              className="mr-2 "
            />
            <Text className={typeId === 1 ? "text-white" : "text-gray-400"}>
              Entrada
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setTypeId(0)}
            className={clsx(
              "flex-row items-center justify-center h-12 gap-2 mt-2 w-[48%] ",
              typeId === 0
                ? "bg-accent-red-background-primary"
                : "bg-background-tertiary",
            )}
          >
            <MaterialIcons
              name="arrow-circle-down"
              size={20}
              color={typeId === 0 ? colors.white : colors["accent-red"]}
              className="mr-2 "
            />
            <Text className={typeId === 0 ? "text-white" : "text-gray-400"}>
              Saída
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
          className={clsx(
            " w-full items-center justify-center h-[50px] rounded-xl mt-4",
            loading && "opacity-50",
          )}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text className="text-sm font-bold text-white">Registrar</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};
