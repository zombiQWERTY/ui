import React, { useEffect, useState } from "react";
import { DEFAULT_BG_COLORS, DefaultBgColors } from "../../theme";

export interface SetBgColor {
  bgColor: DefaultBgColors | string;
  bgHoverable?: boolean;
}

export const isOneOfDefaultBgColors = (
  bgColor: DefaultBgColors | string
): bgColor is DefaultBgColors =>
  DEFAULT_BG_COLORS.includes(bgColor as DefaultBgColors);

export const useOnSetBgColor = (props: SetBgColor) => {
  const [internalStyle, setInternalStyle] = useState<React.CSSProperties>({});
  const [internalClassNames, setInternalClassNames] = useState<string[]>([]);

  const { bgColor, bgHoverable } = props;

  useEffect(() => {
    if (isOneOfDefaultBgColors(bgColor)) {
      setInternalClassNames((prev) => [
        ...prev,
        ...(bgColor === "black"
          ? ["bg-black", bgHoverable ? "hover:bg-black" : ""]
          : [
              `bg-${bgColor}-500`,
              bgHoverable ? `hover:bg-${bgColor}-700` : "",
            ]),
      ]);
    } else {
      if (CSS.supports("color", bgColor)) {
        setInternalStyle((prev) => ({ ...prev, backgroundColor: bgColor }));
      } else {
        console.error(
          "Invalid bgColor property value. Use 'blue' | 'green' | 'black' or CSS color"
        );
      }
    }
  }, [bgColor, bgHoverable, setInternalClassNames, setInternalStyle]);

  return { internalStyle, internalClassNames };
};
