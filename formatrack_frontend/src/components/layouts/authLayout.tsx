import { Outlet } from "react-router";
import { Brand } from "@/components/brand";

export const AuthLayout = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Brand />
        <div className="flex flex-col gap-6">
          <Outlet />
          <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
            Formatrack<sup className="text-[0.5rem]">TM</sup> ©{" "}
            {new Date().getFullYear()}. All rights reserved
          </div>
        </div>
      </div>
    </div>
  );
};
