import { UploadIcon, XIcon } from "lucide-react";
import { formatBytes } from "@/utils/common";
import React, { forwardRef, useEffect, useState } from "react";

export interface FileWithPreview {
  file: File;
  preview: string;
  id: string;
}

interface FileUploadProps {
  previewUrl?: string;
  isDragging: boolean;
  openFileDialog: () => void;
  handleDragEnter: (e: React.DragEvent<HTMLElement>) => void;
  handleDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLElement>) => void;
  removeFile: () => void;
  maxSize: number;
  onChange?: (files: FileWithPreview[]) => void;
  accept?: string;
  value?: File | null;
}

export const FileUpload = forwardRef<HTMLInputElement, FileUploadProps>(
  (
    {
      previewUrl: externalPreviewUrl,
      isDragging,
      openFileDialog,
      handleDragEnter,
      handleDragLeave,
      handleDragOver,
      handleDrop,
      removeFile,
      maxSize,
      onChange,
      accept,
      value,
    },
    ref
  ) => {
    const [internalPreviewUrl, setInternalPreviewUrl] = useState<string | undefined>();

    useEffect(() => {
      if (value) {
        const url = URL.createObjectURL(value);
        setInternalPreviewUrl(url);
        return () => URL.revokeObjectURL(url);
      } else {
        setInternalPreviewUrl(undefined);
      }
    }, [value]);

    useEffect(() => {
      // Gère la prévisualisation externe (URL existante)
      if (externalPreviewUrl && !externalPreviewUrl.startsWith("blob:")) {
        setInternalPreviewUrl(externalPreviewUrl);
      }
    }, [externalPreviewUrl]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files?.length) return;

      const files = Array.from(e.target.files).map((file) => {
        const preview = URL.createObjectURL(file);
        return {
          file,
          preview,
          id: Math.random().toString(36).substring(2, 9),
        };
      });

      onChange?.(files);
      e.target.value = ""; // Réinitialise l'input
    };

    const displayPreviewUrl = internalPreviewUrl || externalPreviewUrl;

    return (
      <div className="relative">
        <div
          role="button"
          onClick={openFileDialog}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          data-dragging={isDragging || undefined}
          className="border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 relative flex min-h-24 flex-col items-center justify-center overflow-hidden rounded-xl border border-dashed p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[img]:border-none has-[input:focus]:ring-[3px]"
        >
          <input
            ref={ref}
            className="sr-only"
            type="file"
            accept={accept}
            onChange={handleFileChange}
            aria-label="Télécharger un fichier"
          />
          {displayPreviewUrl ? (
            <div className="absolute inset-0">
              <img src={displayPreviewUrl} alt="Preview" className="size-full object-cover" />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center px-4 py-2 text-center">
              <UploadIcon className="mb-2 h-4 w-4" />
              <p className="mb-1.5 text-sm font-medium">Déposez votre fichier ici ou cliquez pour parcourir</p>
              <p className="text-muted-foreground text-xs">Taille max: {formatBytes(maxSize)}</p>
            </div>
          )}
        </div>
        {displayPreviewUrl && (
          <div className="absolute top-4 right-4">
            <button
              type="button"
              className="focus-visible:ring-[3px] focus-visible:ring-ring/50 z-50 flex size-8 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
              onClick={() => {
                removeFile();
                setInternalPreviewUrl(undefined);
              }}
              aria-label="Supprimer le fichier"
            >
              <XIcon className="size-4" />
            </button>
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = "FileUpload";
