import * as React from "react";
import { cn } from "../../lib/utils";

const Checkbox = React.forwardRef(({ className, checked, onCheckedChange, id, ...props }, ref) => {
  return (
    <div className="relative h-4 w-4 shrink-0">
      {/* Input invisível mas clicável — cobre o visual inteiramente */}
      <input
        type="checkbox"
        ref={ref}
        id={id}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 m-0"
        {...props}
      />

      {/* Visual do checkbox */}
      <div
        className={cn(
          "h-4 w-4 rounded-sm border border-border transition-colors flex items-center justify-center pointer-events-none",
          checked ? "bg-primary border-primary" : "bg-background",
          className
        )}
      >
        {checked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-3 w-3 text-primary-foreground"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </div>
    </div>
  );
});

Checkbox.displayName = "Checkbox";

export { Checkbox };
