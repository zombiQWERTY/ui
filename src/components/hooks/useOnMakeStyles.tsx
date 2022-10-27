import { useMemo } from "react";

export interface Size {
  width?: string;
  height?: string;
}

export interface OnMakeStyles {
  internalStyle: React.CSSProperties;
  style?: React.CSSProperties;
  size?: Size;
}

const isValidCSSValue = (v: any) => CSS.supports("width", v);

export const useOnMakeStyles = (props: OnMakeStyles) => {
  const { internalStyle, style, size } = props;

  const rootStyle: React.CSSProperties = useMemo(
    () => ({
      ...internalStyle,
      ...(style ?? {}),
      ...(isValidCSSValue(size?.width)
        ? { width: size?.width, maxWidth: size?.width }
        : {}),
      height: isValidCSSValue(size?.height) ? size?.height : "",
    }),
    [internalStyle, style, size]
  );

  return { rootStyle };
};
