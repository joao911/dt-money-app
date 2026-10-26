import { useEffect, useState } from "react";
import { Keyboard, View } from "react-native";

export const useKeyBoardVisible = () => {
  const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyBoardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setIsKeyboardVisible(true);
      },
    );

    const keyBoardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsKeyboardVisible(false);
      },
    );

    return () => {
      keyBoardDidShowListener.remove();
      keyBoardDidHideListener.remove();
    };
  }, []);

  return isKeyboardVisible;
};
