import { ApiResponse } from "@/types/api-response";
import "@tanstack/react-query";

declare module "@tanstack/react-query" {
  interface Register {
    defaultError: ApiResponse;
  }
}
