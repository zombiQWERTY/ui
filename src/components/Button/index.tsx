import { MouseEvent } from "react";
import Link, { LinkProps } from "next/link";
import { useOnButtonClick } from "./hooks/useOnButtonClick";
import { useOnMakeClassNames } from "../hooks/useOnMakeClassNames";
import { useOnSetBgColor } from "../hooks/useOnSetBgColor";
import { Size, useOnMakeStyles } from "../hooks/useOnMakeStyles";
import { DefaultBgColors, DEFAULT_BUTTON_BG_COLOR } from "../../theme";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>["type"];

type OnClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  element?: React.FC<Record<string, any>>;
  href?: LinkProps["href"];
  size?: Size;
  bgColor?: DefaultBgColors | string;
  style?: React.CSSProperties;
  type?: ButtonType;
  onClick?: (evt: OnClickEvent) => void;
};

type ButtonFCProps = Partial<
  Pick<ButtonProps, "children" | "style" | "className" | "onClick">
> & {
  role: "button";
} & { type: ButtonType };
type LinkFCProps = ButtonFCProps & { href: LinkProps["href"] };

const ButtonFC: React.FC<ButtonFCProps> = (props: ButtonFCProps) => (
  <button {...props} />
);

const LinkFC: React.FC<LinkFCProps> = (props: LinkFCProps) => {
  const { href, ...other } = props;
  return (
    <Link href={href} passHref>
      {/* https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/docs/rules/anchor-is-valid.md */}
      <a href="replaced-by-next">
        <ButtonFC {...other} />
      </a>
    </Link>
  );
};

const disablifyClassName = (className?: string) =>
  `${className || ""} bg-gray-500 hover:bg-gray-500`;

export const Button = ({
  children = null,
  className,
  disabled = false,
  element,
  href,
  size,
  bgColor = DEFAULT_BUTTON_BG_COLOR,
  style,
  type = "button",
  onClick,
}: ButtonProps) => {
  const RenderFC = element || (href ? LinkFC : ButtonFC);

  const { onClick: handleAction } = useOnButtonClick({
    baseOnClick: onClick || (() => {}),
    disabled,
  });

  const { internalStyle, internalClassNames } = useOnSetBgColor({
    bgColor,
    bgHoverable: true,
  });

  const { rootClassName } = useOnMakeClassNames({
    internalClassNames,
    className: disabled ? disablifyClassName(className) : className,
  });

  const { rootStyle } = useOnMakeStyles({ internalStyle, style, size });

  return (
    <RenderFC
      style={rootStyle}
      className={rootClassName}
      role="button"
      href={href!}
      type={type}
      onClick={handleAction}
    >
      {children}
    </RenderFC>
  );
};
