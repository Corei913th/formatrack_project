import { ReactNode, useState } from "react";
import { QueryClientProvider as ReactQueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";


export function QueryClientProvider({ children }: { children: ReactNode }) {
  const [client] = useState(() => queryClient);

  return (
    <ReactQueryClientProvider client={client}>
      {children}
    </ReactQueryClientProvider>
  );
}
