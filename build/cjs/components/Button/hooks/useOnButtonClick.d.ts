import { MouseEvent } from "react";
export interface OnButtonClick {
    disabled: boolean;
    baseOnClick: (evt: OnClickEvent) => void;
}
declare type OnClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;
export declare const useOnButtonClick: (props: OnButtonClick) => {
    onClick: (event: OnClickEvent) => void;
};
export {};
