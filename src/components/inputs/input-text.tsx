import { FC, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "text" | "password" | "email";
  // name: string;
  fullWidth?: boolean;
  error?: string;
  hookFormRegister?: UseFormRegisterReturn;
}

/**
 * Creates an input component.
 * Supports only email, password, text
 */
export const InputText: FC<InputProps> = ({
  label,
  fullWidth,
  error,
  hookFormRegister,
  type,
  ...rest
}) => {
  let labelClassName = "form-control max-w-sm";
  let inputClassName = "input input-bordered max-w-sm";
  let spanClassName = "label-text";

  if (fullWidth) {
    labelClassName += " w-full";
    inputClassName += " w-full";
  }

  if (error) {
    spanClassName += " text-error";
    inputClassName += " input-error";
  }

  return (
    <>
      <label className={labelClassName}>
        <div className="label">
          <span className={spanClassName}>{label}</span>
        </div>
        <input
          className={inputClassName}
          type={type}
          {...hookFormRegister}
          {...rest}
        />
      </label>
      {error && <p className="text-error">{error}</p>}
    </>
  );
};

export default InputText;
