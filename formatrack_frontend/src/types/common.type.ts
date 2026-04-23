import type { LucideIcon } from "lucide-react";
import type { ComponentType, CSSProperties, ReactNode } from "react";

export type PageProps<T> = {
  params: Promise<T>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export type Breadcrumb = {
  title: string;
  link?: string;
  isActive?: boolean;
};

export type QueryParams = {
  limit?: number | null;
  page?: number | null;
  [key: string]:
    | string
    | string[]
    | number
    | number[]
    | boolean
    | boolean[]
    | null
    | undefined;
};

export type GenericType = {
  [k: string]:
    | string
    | number
    | boolean
    | null
    | undefined
    | GenericType
    | GenericType[];
};

export type IconType =
  | LucideIcon
  | ComponentType<{
      className?: string;
      size?: number;
    }>;

export type CommonProps = {
  className?: string;
  children?: ReactNode;
  styles?: CSSProperties;
};
