import { useTransactionContext } from "@/context/transaction.context";
import { Checkbox } from "expo-checkbox";
// import { TouchableWithoutFeedback } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import { useMemo, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Modal,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";

interface SelectCategoryModalProps {
  selectedCategory: number;
  onSelect: (categoryId: number) => void;
}

export const SelectCategoryModal = ({
  selectedCategory,
  onSelect,
}: SelectCategoryModalProps) => {
  const [open, setOpen] = useState(false);
  const { categories } = useTransactionContext();

  const selected = useMemo(() => {
    return categories.find(({ id }) => id === selectedCategory);
  }, [categories, selectedCategory]);

  return (
    <>
      <TouchableOpacity
        onPress={() => setOpen(true)}
        className="justify-center pl-4 my-2 rounded-md h-14 bg-background-primary"
      >
        <Text
          className={clsx(
            " text-xl",
            selected ? "text-white" : "text-gray-700",
          )}
        >
          {selected?.name || "Categoria"}
        </Text>
      </TouchableOpacity>
      <Modal visible={open} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View className="items-center justify-center flex-1 bg-black/50">
            <View className="w-[90%] bg-background-secondary p-4 rounded-xl">
              <Text className="mb-4 text-lg text-white">
                Selecione uma categoria
              </Text>
              <FlatList
                data={categories}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      onSelect(item.id);
                      setOpen(false);
                    }}
                    className="flex-row items-center p-4 mb-2 bg-gray-800 rounded-lg"
                  >
                    <Checkbox
                      value={selected?.id === item.id}
                      onValueChange={() => {
                        onSelect(item.id);
                        setOpen(false);
                      }}
                      className="mr-2"
                    />
                    <Text className="text-lg text-white ">{item.name}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
