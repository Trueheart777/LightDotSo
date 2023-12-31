// Copyright (C) 2023 Light, Inc.
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.

// Heavily inspired by the button primitives introduced by @fiveoutofnine
// Site: https://www.fiveoutofnine.com/design/component/button
// Code: https://github.com/fiveoutofnine/www/blob/a04dd54f76f57c145155dce96744d003f0d3de5e/components/ui/button/styles.tsx
// License: MIT

import { cn } from "@lightdotso/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { forwardRef } from "react";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-info focus-visible:ring-offset-2 active:ring-2 disabled:cursor-not-allowed disabled:opacity-30 disabled:ring-0",
  {
    variants: {
      variant: {
        default: "border",
        shadow: "",
        outline: "border",
        ghost: "",
        link: "underline-offset-4 hover:underline",
        loading: "cursor-wait",
        unstyled: "",
      },
      intent: {
        default: [
          // Default
          ["data-[variant=default]:border-border-primary-weak"],
          ["data-[variant=default]:bg-background-primary"],
          ["data-[variant=default]:text-text-weakest"],
          ["data-[variant=default]:hover:border-border-primary-weaker"],
          ["data-[variant=default]:hover:bg-background-primary-weak"],
          ["data-[variant=default]:active:bg-background-primary-weaker"],
          ["data-[variant=default]:active:ring-border-primary-weak"],
          // Shadow
          ["data-[variant=shadow]:bg-background-stronger"],
          ["data-[variant=shadow]:text-text-primary"],
          ["data-[variant=shadow]:hover:bg-background-strongest"],
          ["data-[variant=shadow]:active:ring-border-primary"],
          // Outline
          ["data-[variant=outline]:border-border-primary-weak"],
          ["data-[variant=outline]:text-text"],
          ["data-[variant=outline]:hover:border-border-primary"],
          ["data-[variant=outline]:active:border-border-primary-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text"],
          ["data-[variant=ghost]:hover:text-text-weak"],
          ["data-[variant=ghost]:hover:bg-background-stronger"],
          ["data-[variant=ghost]:active:ring-border-primary"],
          // Link
          ["data-[variant=link]:text-text"],
          // Loading
          ["data-[variant=loading]:bg-background-primary-strong"],
          ["data-[variant=loading]:text-text-weakest"],
          ["data-[variant=loading]:hover:bg-background-primary-weak"],
          ["data-[variant=loading]:active:ring-border-primary"],
        ],
        destructive: [
          // Default
          ["data-[variant=default]:border-border-destructive-weak"],
          ["data-[variant=default]:bg-background-destructive"],
          ["data-[variant=default]:text-text-inverse"],
          ["data-[variant=default]:hover:border-border-destructive-weaker"],
          ["data-[variant=default]:hover:bg-background-destructive-weak"],
          ["data-[variant=default]:active:ring-border-destructive-weaker"],
          // Shadow
          ["data-[variant=shadow]:bg-background-destructive-weak"],
          ["data-[variant=shadow]:text-text-destructive-strong"],
          ["data-[variant=shadow]:hover:bg-background-destructive-weaker"],
          ["data-[variant=shadow]:active:ring-destructive-weak"],
          ["data-[variant=shadow]:active:ring-border-destructive-weaker"],
          // Outline
          ["data-[variant=outline]:border-border-destructive-weak"],
          ["data-[variant=outline]:text-text-destructive"],
          ["data-[variant=outline]:hover:border-border-destructive-stronger"],
          ["data-[variant=outline]:active:border-border-destructive-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text-destructive"],
          ["data-[variant=ghost]:hover:text-text-destructive-strong"],
          ["data-[variant=ghost]:hover:bg-background-destructive-weaker"],
          ["data-[variant=ghost]:active:ring-border-destructive-weaker"],
          // Link
          ["data-[variant=link]:text-text-destructive"],
          // Loading
          ["data-[variant=loading]:bg-background-destructive-strong"],
          ["data-[variant=loading]:text-text-inverse"],
          ["data-[variant=loading]:hover:bg-background-destructive-weak"],
          ["data-[variant=loading]:active:ring-border-destructive-weaker"],
        ],
        error: [
          // Default
          ["data-[variant=default]:border-border-error-weak"],
          ["data-[variant=default]:bg-background-error"],
          ["data-[variant=default]:text-text-inverse"],
          ["data-[variant=default]:hover:border-border-error-weaker"],
          ["data-[variant=default]:hover:bg-background-error-weak"],
          ["data-[variant=default]:active:ring-border-error-weaker"],
          // Shadow
          ["data-[variant=shadow]:bg-background-error/50"],
          ["data-[variant=shadow]:text-text-error-strong"],
          ["data-[variant=shadow]:hover:bg-background-error/30"],
          ["data-[variant=shadow]:active:ring-error-weak"],
          ["data-[variant=shadow]:active:ring-border-error-weaker"],
          // Outline
          ["data-[variant=outline]:border-border-error-weak"],
          ["data-[variant=outline]:text-text-error"],
          ["data-[variant=outline]:hover:border-border-error-weak"],
          ["data-[variant=outline]:active:border-border-error-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text-error"],
          ["data-[variant=ghost]:hover:text-text-error-strong"],
          ["data-[variant=ghost]:hover:bg-background-error-weaker"],
          ["data-[variant=ghost]:active:ring-border-error-weaker"],
          // Link
          ["data-[variant=link]:text-text-error"],
          // Loading
          ["data-[variant=loading]:bg-background-error"],
          ["data-[variant=loading]:text-text-inverse"],
          ["data-[variant=loading]:hover:bg-background-error/70"],
          ["data-[variant=loading]:active:ring-border-error-weaker"],
        ],
        warning: [
          // Default
          ["data-[variant=default]:border-border-warning-weak"],
          ["data-[variant=default]:bg-background-warning"],
          ["data-[variant=default]:text-text-inverse"],
          ["data-[variant=default]:hover:border-border-warning-weaker"],
          ["data-[variant=default]:hover:bg-background-warning/80"],
          ["data-[variant=default]:active:ring-border-warning-weaker"],
          // Shadow
          ["data-[variant=shadow]:bg-background-warning/50"],
          ["data-[variant=shadow]:text-text-warning"],
          ["data-[variant=shadow]:hover:bg-background-warning/30"],
          ["data-[variant=shadow]:active:ring-warning-weak"],
          ["data-[variant=shadow]:active:ring-border-warning-weaker"],
          // Outline
          ["data-[variant=outline]:border-border-warning"],
          ["data-[variant=outline]:text-text-warning"],
          ["data-[variant=outline]:hover:border-border-warning-weak"],
          ["data-[variant=outline]:active:border-border-warning-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text-warning"],
          ["data-[variant=ghost]:hover:text-text-warning-strong"],
          ["data-[variant=ghost]:hover:bg-background-warning/20"],
          ["data-[variant=ghost]:active:ring-border-warning-weaker"],
          // Link
          ["data-[variant=link]:text-text-warning"],
          // Loading
          ["data-[variant=loading]:bg-background-warning"],
          ["data-[variant=loading]:text-text-inverse"],
          ["data-[variant=loading]:hover:bg-background-warning/70"],
          ["data-[variant=loading]:active:ring-border-warning-weaker"],
        ],
        info: [
          // Default
          ["data-[variant=default]:border-border-info-weak"],
          ["data-[variant=default]:bg-background-info"],
          ["data-[variant=default]:text-text-inverse"],
          ["data-[variant=default]:hover:border-border-info-weaker"],
          ["data-[variant=default]:hover:bg-background-info-weak"],
          ["data-[variant=default]:active:ring-border-info-weaker"],
          // Shadow
          ["data-[variant=shadow]:bg-background-info/50"],
          ["data-[variant=shadow]:text-text-info"],
          ["data-[variant=shadow]:hover:bg-background-info/30"],
          ["data-[variant=shadow]:active:ring-info-weak"],
          ["data-[variant=shadow]:active:ring-border-info-weaker"],
          // Outline
          ["data-[variant=outline]:border-border-info"],
          ["data-[variant=outline]:text-text-info"],
          ["data-[variant=outline]:hover:border-border-info-weak"],
          ["data-[variant=outline]:active:border-border-info-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text-info"],
          ["data-[variant=ghost]:hover:text-text-info-strong"],
          ["data-[variant=ghost]:hover:bg-background-info/20"],
          ["data-[variant=ghost]:active:ring-border-info-weaker"],
          // Link
          ["data-[variant=link]:text-text-info"],
          // Loading
          ["data-[variant=loading]:bg-background-info"],
          ["data-[variant=loading]:text-text-inverse"],
          ["data-[variant=loading]:hover:bg-background-info/70"],
          ["data-[variant=loading]:active:ring-border-info-weaker"],
        ],
        success: [
          // Default
          ["data-[variant=default]:border-border-success-weak"],
          ["data-[variant=default]:bg-background-success"],
          ["data-[variant=default]:text-text-inverse"],
          ["data-[variant=default]:hover:border-border-success-weaker"],
          ["data-[variant=default]:hover:bg-background-success-weak"],
          ["data-[variant=default]:active:ring-border-success-weaker"],
          // Shadow
          ["data-[variant=shadow]:bg-background-success/50"],
          ["data-[variant=shadow]:text-text-success"],
          ["data-[variant=shadow]:hover:bg-background-success/30"],
          ["data-[variant=shadow]:active:ring-success-weak"],
          ["data-[variant=shadow]:active:ring-border-success-weaker"],
          // Outline
          ["data-[variant=outline]:border-border-success"],
          ["data-[variant=outline]:text-text-success"],
          ["data-[variant=outline]:hover:border-border-success-weak"],
          ["data-[variant=outline]:active:border-border-success-weaker"],
          ["data-[variant=outline]:active:ring-0"],
          // Ghost
          ["data-[variant=ghost]:text-text-success"],
          ["data-[variant=ghost]:hover:text-text-success-strong"],
          ["data-[variant=ghost]:hover:bg-background-success/20"],
          ["data-[variant=ghost]:active:ring-border-success-weaker"],
          // Link
          ["data-[variant=link]:text-text-success"],
          // Loading
          ["data-[variant=loading]:bg-background-success"],
          ["data-[variant=loading]:text-text-inverse"],
          ["data-[variant=loading]:hover:bg-background-success/70"],
          ["data-[variant=loading]:active:ring-border-success-weaker"],
        ],
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 px-3 py-1.5",
        lg: "h-10 px-8",
        icon: "h-10 w-10",
        unsized: "",
      },
    },
    defaultVariants: {
      variant: "default",
      intent: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, intent, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";

    if (variant === "loading" && !asChild) {
      return (
        <Comp
          ref={ref}
          className={cn(
            buttonVariants({
              variant,
              intent,
              size,
              className,
            }),
          )}
          data-variant={variant ?? "default"}
          {...props}
        >
          <>
            {variant === "loading" && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            {props.children}
          </>
        </Comp>
      );
    }

    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({
            variant,
            intent,
            size,
            className,
          }),
        )}
        data-variant={variant ?? "default"}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
