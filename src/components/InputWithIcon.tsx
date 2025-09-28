"use client";

import React from "react";
import { tv, type VariantProps } from "tailwind-variants";
import { cx, focusInput, hasErrorInput } from "@/lib/utils";

const inputWithIconStyles = tv({
  base: [
    // base
    "relative block w-full appearance-none truncate rounded-md border px-2.5 py-2 shadow-sm outline-none transition sm:text-sm",
    // border color
    "border-gray-300 dark:border-gray-800",
    // text color
    "text-gray-900 dark:text-gray-50",
    // placeholder color
    "placeholder-gray-400 dark:placeholder-gray-500",
    // background color
    "bg-white dark:bg-gray-950",
    // disabled
    "disabled:border-gray-300 disabled:bg-gray-100 disabled:text-gray-400",
    "disabled:dark:border-gray-700 disabled:dark:bg-gray-800 disabled:dark:text-gray-500",
    // focus
    focusInput,
  ],
  variants: {
    hasError: {
      true: hasErrorInput,
    },
    hasIcon: {
      true: "pl-10",
      false: "",
    },
  },
});

interface InputWithIconProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputWithIconStyles> {
  icon?: React.ReactNode;
}

const InputWithIcon = React.forwardRef<HTMLInputElement, InputWithIconProps>(
  ({ icon, hasError, className, ...props }, forwardedRef) => {
    return (
      <div className="relative w-full">
        <input
          ref={forwardedRef}
          className={cx(inputWithIconStyles({ hasError, hasIcon: !!icon }), className)}
          {...props}
        />
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <div className="h-5 w-5 text-gray-400 dark:text-gray-500 flex items-center justify-center">
              {icon}
            </div>
          </div>
        )}
      </div>
    );
  }
);

InputWithIcon.displayName = "InputWithIcon";

export { InputWithIcon };
