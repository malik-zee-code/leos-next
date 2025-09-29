"use client";

import { useTheme } from "next-themes";
import { RiSunLine, RiMoonLine } from "@remixicon/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/Button";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="secondary" size="sm" className="h-10 w-10 rounded-full p-1">
        <RiSunLine className="h-5 w-5" />
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        console.log("Current theme:", theme);
        const newTheme = theme === "dark" ? "light" : "dark";
        console.log("Setting theme to:", newTheme);
        setTheme(newTheme);
      }}
      variant="secondary"
      size="sm"
      className="h-10 w-10 rounded-full p-1"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <RiSunLine className="h-5 w-5" /> : <RiMoonLine className="h-5 w-5" />}
    </Button>
  );
}
