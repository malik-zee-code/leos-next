"use client";

import { useState, ReactNode } from "react";
import { Button } from "@/components/Button";
import { RiArrowDownSLine, RiArrowRightSLine } from "@remixicon/react";

interface NavigationDropdownProps {
  title: string;
  icon: ReactNode;
  children: ReactNode;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function NavigationDropdown({
  title,
  icon,
  children,
  isOpen = false,
  onToggle,
}: NavigationDropdownProps) {
  return (
    <div className="space-y-1">
      <Button
        onClick={onToggle}
        variant="ghost"
        className="w-full flex items-center justify-between rounded-md px-2 py-2 text-left text-sm text-gray-700 dark:text-gray-300"
      >
        <div className="flex items-center gap-2">
          {icon}
          {title}
        </div>
        {isOpen ? (
          <RiArrowDownSLine className="h-4 w-4" />
        ) : (
          <RiArrowRightSLine className="h-4 w-4" />
        )}
      </Button>
      <div
        className={`ml-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
