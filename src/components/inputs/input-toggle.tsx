import { FC, InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "checkbox";

  error?: string;
  hookFormRegister?: UseFormRegisterReturn;
}

export const InputToggle: FC<InputProps> = ({
  label,
  error,
  hookFormRegister,
  type,
  ...rest
}) => {
  let labelClassName = "label cursor-pointer";
  let inputClassName = "toggle toggle-primary";
  let spanClassName = "label-text";

  if (error) {
    spanClassName += " text-error";
    inputClassName += " input-error";
  }

  return (
    <div className="form-control w-52">
      <label className={labelClassName}>
        <span className={spanClassName}>{label}</span>
        <input
          className={inputClassName}
          type={type}
          {...hookFormRegister}
          {...rest}
        />
      </label>
      {error && <p className="text-error">{error}</p>}
    </div>
  );
};

export default InputToggle;
