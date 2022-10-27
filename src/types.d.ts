// eslint-disable
import * as React from "react";

interface ButtonProps {
  onClick?: () => any;

  /** Root element will have this className */
  className?: string;

  /** Override default button styles. */
  style?: object;
}

declare class Button extends React.Component<ButtonProps, any> {}

export { Button };
