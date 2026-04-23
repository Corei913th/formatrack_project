/* eslint-disable @typescript-eslint/no-unused-vars */
import "@tanstack/react-table";
import { CSSProperties } from "react";

declare module "@tanstack/table-core" {
  interface ColumnMeta<TData extends RowData, TValue> {
    styles?: CSSProperties;
    className?: string;
  }
}
