import React, { useEffect } from "react";

export type ButtonBgColor = "green" | "blue" | "black";
export const BUTTON_BG_COLORS: ButtonBgColor[] = ["green", "blue", "black"];
export const DEFAULT_BG_COLOR = "green";

export interface SetBgColor {
  bgColor: ButtonBgColor | string;
  disabled: boolean;
  setInternalClassNames: React.Dispatch<React.SetStateAction<string[]>>;
  setInternalStyle: React.Dispatch<React.SetStateAction<React.CSSProperties>>;
}

export const isOneOfDefaultBgColors = (
  bgColor: ButtonBgColor | string
): bgColor is ButtonBgColor =>
  BUTTON_BG_COLORS.includes(bgColor as ButtonBgColor);

export const useOnSetBgColor = (props: SetBgColor) => {
  const { setInternalClassNames, setInternalStyle, bgColor, disabled } = props;

  useEffect(() => {
    if (disabled) {
      setInternalClassNames((prev) => [
        ...prev,
        ...["bg-gray-500", "hover:bg-gray-500"],
      ]);

      return;
    }
    if (isOneOfDefaultBgColors(bgColor)) {
      setInternalClassNames((prev) => [
        ...prev,
        ...(bgColor === "black"
          ? ["bg-black", "hover:bg-black"]
          : [`bg-${bgColor}-500`, `hover:bg-${bgColor}-700`]),
      ]);
    } else {
      if (CSS.supports("color", bgColor)) {
        setInternalStyle((prev) => ({ ...prev, backgroundColor: bgColor }));
      } else {
        console.error(
          "Invalid bgColor property value. 'blue' | 'green' | 'black' or CSS color"
        );
      }
    }
  }, [bgColor, setInternalClassNames, setInternalStyle, disabled]);
};
