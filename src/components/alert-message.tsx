import { FC } from "react";

import ErrorIcon from "./icons/error";
import InfoIcon from "./icons/info";
import WarningIcon from "./icons/warning";
import SuccessIcon from "./icons/success";

import CloseIcon from "./icons/close";

import { TAlertMessage } from "@/store/general";

const icons = {
  default: InfoIcon,
  error: ErrorIcon,
  info: InfoIcon,
  success: SuccessIcon,
  warning: WarningIcon,
};

// https://tailwindcss.com/docs/content-configuration#dynamic-class-names
// concatenating classNames will not work!
const alertClassNames = {
  error: "alert shadow-lg alert-error",
  info: "alert shadow-lg alert-info",
  success: "alert shadow-lg alert-success",
  warning: "alert shadow-lg alert-warning",
};

interface IAlertMessage {
  message: TAlertMessage;
  onClose?: () => void;
}

export const AlertMessage: FC<IAlertMessage> = ({ message, onClose }) => {
  let className = `alert shadow-lg`;

  let Icon = icons.default;

  if (message.type) {
    className = alertClassNames[message.type];
    Icon = icons[message.type];
  }

  return (
    <div role="alert" className={className}>
      <Icon />
      <div>
        <div>{message.text}</div>
      </div>
      {onClose && (
        <button className="btn btn-xs btn-ghost" onClick={onClose}>
          <CloseIcon />
        </button>
      )}
    </div>
  );
};

export default AlertMessage;
