import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { useOnMakeClassNames } from "../hooks/useOnMakeClassNames";
import { useOnSetBgColor } from "../hooks/useOnSetBgColor";
import { Size, useOnMakeStyles } from "../hooks/useOnMakeStyles";
import { twMerge } from "tailwind-merge";
import { DefaultBgColors, DEFAULT_MODAL_BG_COLOR } from "../../theme";

const ESCAPE = "Escape";
const isKeyEscape = (key: string) => key === ESCAPE;

export type ModalProps = {
  title: string;
  content: string;
  className?: string;
  size?: Size;
  bgColor?: DefaultBgColors | string;
  style?: React.CSSProperties;
  isShowing: boolean;
  toggle: () => void;
};

export const Modal = ({
  isShowing,
  toggle,
  title,
  content,
  className,
  style,
  size,
  bgColor = DEFAULT_MODAL_BG_COLOR,
}: ModalProps) => {
  const onInnerClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
    e.stopPropagation();

  useEffect(() => {
    const closeOnEsc = (e: KeyboardEvent) => {
      if (isKeyEscape(e.key) && isShowing) {
        toggle();
      }
    };

    window.addEventListener("keydown", closeOnEsc);
    return () => window.removeEventListener("keydown", closeOnEsc);
  }, [isShowing, toggle]);

  const { internalStyle, internalClassNames } = useOnSetBgColor({
    bgColor,
  });

  const { rootClassName } = useOnMakeClassNames({
    internalClassNames,
    className,
  });

  const modalClassName = twMerge(
    `relative p-4 w-full h-full md:h-auto rounded-lg shadow dark:bg-gray-700 max-w-md ${rootClassName} py-0 px-0`
  );

  const { rootStyle } = useOnMakeStyles({ internalStyle, style, size });

  return isShowing
    ? createPortal(
        <React.Fragment>
          <div className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40" />
          <div
            tabIndex={-1}
            aria-modal
            aria-hidden
            role="dialog"
            className="w-full md:inset-0 h-modal md:h-full grid place-items-center overflow-y-auto overflow-x-hidden fixed z-50"
            onClick={toggle}
          >
            <div
              onClick={onInnerClick}
              style={rootStyle}
              className={modalClassName}
            >
              <div className="h-full">
                <div className="flex justify-between items-center p-5 rounded-t border-b dark:border-gray-600">
                  <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                    {title}
                  </h3>
                  <button
                    type="button"
                    className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                    aria-label="Close"
                    data-dismiss="modal"
                    onClick={toggle}
                  >
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="sr-only" aria-hidden="true">
                      Close modal
                    </span>
                  </button>
                </div>
                <div className="p-6 space-y-6 text-gray-900 font-normal">
                  {content}
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>,
        document.body
      )
    : null;
};
