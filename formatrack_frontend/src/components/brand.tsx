import { CommonProps } from "@/types/common.type";
import { cn } from "@/utils/common";

export function Brand(
  props: CommonProps & {
    brandClassNames?: string;
  }
) {
  const { className, brandClassNames } = props;

  return (
    <div
      className={cn("flex gap-2 items-center justify-center w-full", className)}
    >

      <span
        className={cn(
          "w-fit font-extrabold text-xl tracking-tighter text-left leading-none dark:text-foreground text-primary",
          brandClassNames
        )}
      >
        Formatrack
        <sup className="ml-1 text-xs font-bold tracking-normal">TM</sup>
      </span>
    </div>
  );
}
