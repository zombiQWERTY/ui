import { useCallback, MouseEvent } from "react";

export interface OnButtonClick {
  disabled: boolean;
  baseOnClick: (evt: OnClickEvent) => void;
}

type OnClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

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
