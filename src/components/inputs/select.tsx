import { FC, SelectHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type TOption = {
  key: string;
  value: string;
  label: string;
};

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  fullWidth?: boolean;
  error?: string;
  options: TOption[]; // TODO: bad!
  hookFormRegister?: UseFormRegisterReturn;
}

export const Select: FC<SelectProps> = ({
  label,
  fullWidth,
  error,
  options,
  hookFormRegister,
  ...rest
}) => {
  let labelClassName = "form-control max-w-sm";
  let selectClassName = "select select-bordered";
  let spanClassName = "label-text";

  if (fullWidth) {
    labelClassName += " w-full";
    selectClassName += " w-full";
  }

  if (error) {
    spanClassName += " text-error";
    selectClassName += " select-error";
  }

  return (
    <>
      <label className={labelClassName}>
        <div className="label">
          <span className={spanClassName}>{label}</span>
        </div>
        <select className={selectClassName} {...hookFormRegister} {...rest}>
          {options.map((o) => (
            <option key={o.key} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </label>

      {error && <p className="text-error">{error}</p>}
    </>
  );
};

export default Select;
