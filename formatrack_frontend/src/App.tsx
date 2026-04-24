import { QueryClientProvider } from "@/providers/queryClientProvider";
import { Toaster } from "@/components/ui/sonner";
import AuthProvider from "@/providers/authProvider";
import LayoutProvider from "@/providers/layoutProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "@/routes/app-routing";
import { NuqsAdapter } from "nuqs/adapters/react";

import { Suspense } from "react";
import { Skeleton } from "./components/ui/skeleton";
import { ThemeProvider } from "./providers/themeProvider";

const App = () => {
  return (
    <QueryClientProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange
      >
        <NuqsAdapter>
          <AuthProvider>
            <LayoutProvider>
              <Suspense fallback={<Skeleton />}>
                <RouterProvider router={router} />
              </Suspense>
              <Toaster />
            </LayoutProvider>
          </AuthProvider>
        </NuqsAdapter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
