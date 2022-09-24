import React from 'react';
import type { DropzoneOptions } from 'react-dropzone';
import { useDropzone } from 'react-dropzone';

type DropzoneProps = DropzoneOptions & {
  setFile: (file: File) => void;
};

export const FileUpload = ({
  multiple,
  setFile,
  ...rest
}: DropzoneProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
    },
    accept: {
      'text/csv': ['.csv'],
    },
    ...rest,
  });

  return (
    <div {...getRootProps()} className="rounded-md bg-gray-100 p-3 font-mono text-lg cursor-pointer">
      <input {...getInputProps()} />
      <span>your csv</span>
    </div>
  );
};
