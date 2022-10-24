import { useState, MouseEvent } from "react";
import Link, { LinkProps } from "next/link";
import { useOnMakeClassNames } from "./hooks/onMakeClassNames";
import { useOnButtonClick } from "./hooks/onButtonClick";
import {
  ButtonBgColor,
  DEFAULT_BG_COLOR,
  useOnSetBgColor,
} from "./hooks/onSetBgColor";
import { Size, useOnMakeStyles } from "./hooks/onMakeStyles";

type ButtonType = React.ButtonHTMLAttributes<HTMLButtonElement>["type"];

type OnClickEvent = MouseEvent<HTMLButtonElement | HTMLAnchorElement>;

export type ButtonProps = {
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  element?: React.FC<Record<string, any>>;
  href?: LinkProps["href"];
  size?: Size;
  bgColor?: ButtonBgColor | string;
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

export const Button = ({
  children = null,
  className,
  disabled = false,
  element,
  href,
  size,
  bgColor = DEFAULT_BG_COLOR,
  style,
  type = "button",
  onClick,
}: ButtonProps) => {
  const [internalStyle, setInternalStyle] = useState<React.CSSProperties>({});
  const [internalClassNames, setInternalClassNames] = useState<string[]>([]);

  const RenderFC = element || (href ? LinkFC : ButtonFC);

  const { onClick: handleAction } = useOnButtonClick({
    baseOnClick: onClick || (() => {}),
    disabled,
  });

  useOnSetBgColor({
    setInternalClassNames,
    setInternalStyle,
    bgColor,
    disabled,
  });

  const { rootClassName } = useOnMakeClassNames({
    internalClassNames,
    className,
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
