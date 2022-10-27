import React from "react";
import { Size } from "../hooks/useOnMakeStyles";
import { DefaultBgColors } from "../../theme";
export declare type ModalProps = {
    title: string;
    content: string;
    className?: string;
    size?: Size;
    bgColor?: DefaultBgColors | string;
    style?: React.CSSProperties;
    isShowing: boolean;
    toggle: () => void;
};
export declare const Modal: ({ isShowing, toggle, title, content, className, style, size, bgColor, }: ModalProps) => React.ReactPortal | null;
