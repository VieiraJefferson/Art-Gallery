import * as React from "react";
import { cn } from "../../lib/utils";

const Textarea = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[100px] w-full rounded-sm border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent focus-visible:border-accent disabled:cursor-not-allowed disabled:opacity-50 transition-colors resize-none",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
