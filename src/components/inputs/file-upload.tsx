import { FC, InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

import UploadIcon from "../icons/upload";
import CloseIcon from "../icons/close";
import { logger } from "@/utils";
import { api_uploadFile } from "@/api/upload";

interface FileUploadProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  type: "file";
  id: string;
  // name: string;
  fullWidth?: boolean;
  error?: string;
  defaultFileUrl?: string;
  hookFormRegister?: UseFormRegisterReturn;
  onUploadSuccess?: (url: string) => void;
}

/**
 * Creates an input file component.
 * Supports only file
 */
export const FileUpload: FC<FileUploadProps> = ({
  label,
  id,
  fullWidth,
  error,
  hookFormRegister,
  type,
  defaultFileUrl,
  onUploadSuccess,
  ...rest
}) => {
  let labelClassName = "form-control max-w-sm";
  let inputClassName =
    "btn input input-bordered flex justify-between w-full items-center gap-2 cursor-pointer h-14";
  let spanClassName = "label-text";

  if (fullWidth) {
    labelClassName += " w-full";
    inputClassName += " w-full";
  }

  if (error) {
    spanClassName += " text-error";
    inputClassName += " input-error";
  }

  // TODO: figure out how to show default value from react-hook-form
  const [fileUrl, setFileUrl] = useState("");
  useEffect(() => {
    if (defaultFileUrl) {
      setFileUrl(defaultFileUrl);
    }
  }, [defaultFileUrl]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    logger(e);
    if (!e.target.files) {
      return;
    }
    const file = e.target.files[0];
    logger("file to upload");
    logger(file);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const { data: apiData } = await api_uploadFile(formData);
      if (apiData.fetchUrl) {
        setFileUrl(apiData.fetchUrl);
        // the below useEffect updates hook form setValue
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    if (onUploadSuccess) {
      onUploadSuccess(fileUrl);
    }
  }, [fileUrl]);

  return (
    <>
      <label className={labelClassName} htmlFor={id}>
        <div className="label">
          <span className={spanClassName}>{label}</span>
        </div>
      </label>
      <div className="relative">
        <input
          type="file"
          className="hidden"
          id={id}
          onChange={handleFileChange}
          {...rest}
        />
        <label
          htmlFor={id}
          className="btn input input-bordered flex justify-between w-full items-center gap-2 cursor-pointer h-14"
        >
          <span>{fileUrl || "Choose a file"}</span>
          {/* this bit is used by hook form for doing validation */}
          <input type="text" className="hidden" {...hookFormRegister} />
          <UploadIcon />
        </label>
      </div>
      {fileUrl && (
        <div className="relative mt-4 w-24 h-24">
          <img
            src={fileUrl}
            alt={`Preview of ${label}`}
            className="w-full h-full object-cover rounded"
          />
          <button
            type="button"
            onClick={() => setFileUrl("")}
            className="absolute top-1 right-1 bg-base-200 p-1 rounded-full"
          >
            <CloseIcon />
          </button>
        </div>
      )}
      {error && <p className="text-error">{error}</p>}
    </>
  );
};

export default FileUpload;
