import { useCallback, MouseEvent } from "react";

export type OnClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export interface OnButtonClick {
  disabled: boolean;
  baseOnClick: (evt: OnClickEvent) => void;
}

export const useOnButtonClick = (props: OnButtonClick) => {
  const { baseOnClick, disabled } = props;

  const onClick = useCallback(
    (event: OnClickEvent) => {
      if (disabled) {
        return;
      }

      baseOnClick(event);
    },
    [baseOnClick, disabled]
  );

  return { onClick };
};
