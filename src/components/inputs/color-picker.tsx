import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import SwatchIcon from "../icons/swatch";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "color";
  defaultColor?: string;
  // name: string;
  fullWidth?: boolean;
  error?: string;
  hookFormRegister?: UseFormRegisterReturn;
}

/**
 * Creates an input component.
 * Supports only email, password, text
 */
export const ColorPicker: FC<InputProps> = ({
  label,
  fullWidth,
  error,
  hookFormRegister,
  type,
  defaultColor,
  ...rest
}) => {
  let labelClassName = "form-control max-w-sm mb-2";
  let inputClassName = "input input-bordered w-12 h-12 p-0 border-none";
  let inputTextClassName = "input input-white w-full bg-white";
  let spanClassName = "label-text";

  if (fullWidth) {
    labelClassName += " w-full";
    inputClassName += " w-full";
  }

  if (error) {
    spanClassName += " text-error";
    inputClassName += " input-error";
    inputTextClassName + " input-error";
  }

  // TODO: figure out how to show default value from react-hook-form
  const [color, setColor] = useState("");
  useEffect(() => {
    setColor(defaultColor || "");
  }, [defaultColor]);

  return (
    <>
      <label className={labelClassName}>
        <div className="label">
          <span className={spanClassName}>{label}</span>
        </div>
      </label>
      <div className="flex items-center border rounded-lg p-2 gap-2 bg-base-100">
        <input
          type={type}
          className="input input-bordered w-12 h-12 p-0 border-none"
          {...hookFormRegister}
          {...rest}
        />
        <span className="input input-white w-full bg-white">{color}</span>
        <SwatchIcon />
      </div>
      {error && <p className="text-error">{error}</p>}
    </>
  );
};

export default ColorPicker;
