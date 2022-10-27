import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

export interface OnMakeClassNames {
  internalClassNames: string[];
  className?: string;
}

export const useOnMakeClassNames = (props: OnMakeClassNames) => {
  const { internalClassNames, className } = props;

  const rootClassName = useMemo(() => {
    const classList: string[] = [
      ...internalClassNames,
      "text-white",
      "font-bold",
      "py-2",
      "px-4",
      "rounded",
      className ?? "",
    ];

    return twMerge(classList).trim().replace(/[\s]+/gi, " ");
  }, [className, internalClassNames]);

  return { rootClassName };
};
