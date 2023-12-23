'use client';
import {LucideFileWarning} from 'lucide-react';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import type {ReactNode} from 'react';
import { useMemo} from 'react';
import {Stack, Typography} from '@mui/material'
import { useDropzone, type DropzoneOptions } from 'react-dropzone';
import { twMerge } from 'tailwind-merge';
import * as React from "react";
import Button from "@mui/material/Button";

const variants = {
  base: 'relative rounded-md p-4 w-96 max-w-[calc(100vw-1rem)] flex justify-center items-center flex-col cursor-pointer border border-dashed border-gray-400 dark:border-gray-300 transition-colors duration-200 ease-in-out',
  active: 'border-2',
  disabled:
    'bg-gray-200 border-gray-300 cursor-default pointer-events-none bg-opacity-30 dark:bg-gray-700 dark:border-gray-600',
  accept: 'border border-blue-500 bg-blue-500 bg-opacity-10',
  reject: 'border border-red-700 bg-red-700 bg-opacity-10',
};

enum ProgressState {
  PENDING= 'PENDING' , 
  COMPLETE= 'COMPLETE' , 
  ERROR= 'ERROR',
}

export interface FileState {
  file: File;
  key: string; // used to identify the file in the progress callback
  progress: ProgressState | number;
}

interface InputProps {
  className?: string;
  value?: FileState[];
  onChange?: (files: FileState[]) => void;
  onFilesAdded?: (addedFiles: FileState[]) => void ;
  disabledInput?: boolean;
  dropzoneOptions?: Omit<DropzoneOptions, 'disabled'>;
}

const ERROR_MESSAGES = {
  fileTooLarge(maxSize: number) {
    return `The file is too large. Max size is ${formatFileSize(maxSize)}.`;
  },
  fileInvalidType() {
    return 'Invalid file type.';
  },
  tooManyFiles(maxFiles: number) {
    return `You can only add ${maxFiles} file(s).`;
  },
  fileNotSupported() {
    return 'The file is not supported.';
  },
};

const SingleFileDropzone = React.forwardRef<HTMLInputElement, InputProps>(
  (
    { dropzoneOptions, value, className, disabledInput, onFilesAdded, onChange },
    ref,
  ) => {
    const [customError, setCustomError] = React.useState<string>();
    let disabled = false;
    if (dropzoneOptions?.maxFiles && value?.length) {
      disabled = disabledInput ?? value.length >= dropzoneOptions.maxFiles;
    }
    // dropzone configuration
    const {
      getRootProps,
      getInputProps,
      fileRejections,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      disabled,
      onDrop: (acceptedFiles) => {
        const files = acceptedFiles;
        setCustomError(undefined);
        if (
          dropzoneOptions?.maxFiles &&
          (value?.length ?? 0) + files.length > dropzoneOptions.maxFiles
        ) {
          setCustomError(ERROR_MESSAGES.tooManyFiles(dropzoneOptions.maxFiles));
          return;
        }
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- it's not always truthy
        if (files) {
          const addedFiles = files.map<FileState>((file) => ({
            file,
            key: Math.random().toString(36).slice(2),
            progress: ProgressState.PENDING,
          }));
          onFilesAdded?.(addedFiles);
          onChange?.([...(value ?? []), ...addedFiles]);
        }
      },
      ...dropzoneOptions,
    });

    // styling
    const dropZoneClassName = React.useMemo(
      () =>
        twMerge(
          variants.base,
          isFocused && variants.active,
          disabled && variants.disabled,
          (isDragReject || fileRejections[0]) && variants.reject,
          isDragAccept && variants.accept,
          className,
        ).trim(),
      [
        isFocused,
        fileRejections,
        isDragAccept,
        isDragReject,
        disabled,
        className,
      ],
    );

    // error validation messages
    const errorMessage = useMemo(() => {
      if (fileRejections[0]) {
        const { errors } = fileRejections[0];
        if (errors[0]?.code === 'file-too-large') {
          return ERROR_MESSAGES.fileTooLarge(dropzoneOptions?.maxSize ?? 0);
        } else if (errors[0]?.code === 'file-invalid-type') {
          return ERROR_MESSAGES.fileInvalidType();
        } else if (errors[0]?.code === 'too-many-files') {
          return ERROR_MESSAGES.tooManyFiles(dropzoneOptions?.maxFiles ?? 0);
        } 
          return ERROR_MESSAGES.fileNotSupported();
        
      }
      return undefined;
    }, [fileRejections, dropzoneOptions]);
    


    return (
      <div>
        <Stack sx={{
          alignItems: 'center',
          justifyContent: 'center',
          border: '1px dashed black',
          borderRadius: '5px',
          minHeight: '100px'
        }}>
          <div>
            {/* Main File Input */}
            <div
              {...getRootProps({
                className: dropZoneClassName,
              })}
            >
              {disabled ? null: <input ref={ref} {...getInputProps()} />}
              <Stack sx={{
                alignItems: 'center'
              }}>
                <CloudUploadIcon fontSize='large' />
                <Typography>
                  Drag & drop or click to upload
                </Typography>
              </Stack>
            </div>

            {/* Error Text */}
            <div className="mt-1 text-xs text-red-500">
              {customError ?? errorMessage}
            </div>
          </div>

          {/* Selected Files */}
          {value?.map(({ file, progress, key }, i) => (
            <Stack
              // className="flex h-16 flex-col border-gray-300 px-4 py-2"
              key={key}
            >
              <Stack direction='row' gap={3} sx={{
                alignItems: 'center'
              }}>
                <UploadFileIcon fontStyle={7} />
                  <Typography sx={{
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}>
                    {file.name}
                  </Typography>
                  <Typography variant='subtitle2'>
                    {formatFileSize(file.size)}
                  </Typography>
                <div className="grow" />
                <div className="flex w-12 justify-end text-xs">
                  <HandleProgress iter={i} onChange={onChange} progress={progress} value={value} />
                </div>
              </Stack>
              {/* Progress Bar */}
              {typeof progress === 'number' && (
                <div className="relative h-0">
                  <div className="absolute top-1 h-1 w-full overflow-clip rounded-full bg-gray-200 dark:bg-gray-700">
                    <div
                      className="h-full bg-gray-400 transition-all duration-300 ease-in-out dark:bg-white"
                      style={{
                        width: progress ? `${progress}%` : '0%',
                      }}
                    />
                  </div>
                </div>
              )}
            </Stack>
          ))}
        </Stack>
      </div>
    );
  },
);
SingleFileDropzone.displayName = 'SingleFileDropzone';

function formatFileSize(bytesUnknown?: number): string {
  if (!bytesUnknown) {
    return '0 Bytes';
  }
  const bytes = Number(bytesUnknown);
  if (bytes === 0) {
    return '0 Bytes';
  }
  const k = 1024;
  const dm = 2;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

function HandleProgress({progress, iter, value, onChange}: {
  iter: number,
  progress: ProgressState | number,
  onChange?: (files: FileState[]) => void;
  value?: FileState[];
  }): ReactNode {
      const handlePendingButton = (): void => {
        if (onChange && value) {
          value.filter((_, index) => index !== iter)
        }
      }
      if (typeof progress === 'number') {
        return <Typography>{Math.round(progress)}%</Typography>
      }
      switch (progress) {
        case ProgressState.ERROR:
          return <LucideFileWarning className="shrink-0 text-red-600 dark:text-red-400" />
        case ProgressState.COMPLETE:
          return <CheckCircleOutlineIcon className="shrink-0 text-green-600 dark:text-gray-400" />
        case ProgressState.PENDING:
          return (<Button onClick={handlePendingButton}>
                      <DeleteOutlineIcon className="shrink-0" />
                    </Button>)


      }
    }

export { SingleFileDropzone };