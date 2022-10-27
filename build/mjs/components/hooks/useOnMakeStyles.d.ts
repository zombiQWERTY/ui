/// <reference types="react" />
export interface Size {
    width?: string;
    height?: string;
}
export interface OnMakeStyles {
    internalStyle: React.CSSProperties;
    style?: React.CSSProperties;
    size?: Size;
}
export declare const useOnMakeStyles: (props: OnMakeStyles) => {
    rootStyle: import("react").CSSProperties;
};
