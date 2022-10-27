import React from "react";
import { DefaultBgColors } from "../../theme";
export interface SetBgColor {
    bgColor: DefaultBgColors | string;
    bgHoverable?: boolean;
}
export declare const isOneOfDefaultBgColors: (bgColor: DefaultBgColors | string) => bgColor is DefaultBgColors;
export declare const useOnSetBgColor: (props: SetBgColor) => {
    internalStyle: React.CSSProperties;
    internalClassNames: string[];
};
