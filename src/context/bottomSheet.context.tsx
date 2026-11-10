import {
  FC,
  useState,
  useContext,
  createContext,
  PropsWithChildren,
  ReactNode,
  useCallback,
  useRef,
} from "react";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { TouchableWithoutFeedback, View } from "react-native";
import { colors } from "@/styles/colors";

interface BottomSheetContextType {
  openBottomSheet: (content: ReactNode, index: number) => void;
  closeBottomSheet: () => void;
}

export const BottomSheetContext = createContext({} as BottomSheetContextType);

export const BottomSheetProvider: FC<PropsWithChildren> = ({ children }) => {
  const [content, setContent] = useState<ReactNode | null>(null);
  const [index, setIndex] = useState(-1);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["70%", "90%"];

  const openBottomSheet = useCallback(
    (newContent: ReactNode, index: number) => {
      setContent(newContent);
      setIndex(index);
      setIsBottomSheetOpen(true);
      bottomSheetRef.current?.snapToIndex(index);
    },
    [],
  );

  const closeBottomSheet = useCallback(() => {
    setContent(null);
    setIndex(-1);
    setIsBottomSheetOpen(false);
    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsBottomSheetOpen(false);
    }
  }, []);

  return (
    <BottomSheetContext.Provider
      value={{
        openBottomSheet,
        closeBottomSheet,
      }}
    >
      {children}
      {isBottomSheetOpen && (
        <TouchableWithoutFeedback onPress={() => closeBottomSheet()}>
          <View className="absolute inset-0 bg-black/70 z-1" />
        </TouchableWithoutFeedback>
      )}
      <BottomSheet
        ref={bottomSheetRef}
        index={index}
        snapPoints={snapPoints}
        enablePanDownToClose
        onChange={handleSheetChanges}
        backgroundStyle={{
          backgroundColor: colors["background-secondary"],
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          elevation: 9,
        }}
      >
        <BottomSheetScrollView>{content}</BottomSheetScrollView>
      </BottomSheet>
    </BottomSheetContext.Provider>
  );
};

export const useBottomSheetContext = () => {
  return useContext(BottomSheetContext);
};
