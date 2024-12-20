import { FC, ReactElement } from "react";
import { RevertIcon, XMarkIcon } from "./icons";

type ButtonProps = React.ComponentProps<"button">;

export const ExpandButton: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {children}
    </button>
  );
};

export const DeleteButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <XMarkIcon />
    </button>
  );
};

export const RestoreButton: FC<Omit<ButtonProps, "children">> = (props) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      <RevertIcon />
    </button>
  );
};

export const ToggleButton: FC<
  Omit<ButtonProps, "children"> & {
    toggleState?: boolean;
    contentOn: ReactElement | string;
    contentOff: ReactElement | string;
  }
> = ({ contentOn: iconOn, contentOff: iconOff, toggleState, ...props }) => {
  return (
    <button
      className="hover:text-gray-700 transition-colors flex items-center justify-center"
      {...props}
    >
      {toggleState ? iconOn : iconOff}
    </button>
  );
};
