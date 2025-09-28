"use client";

import { useTheme } from "next-themes";

export function ThemeTest() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="fixed top-20 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 p-4 rounded-lg shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Theme Test</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Current theme: {theme}</p>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Toggle Theme
      </button>
      <div className="mt-2 p-2 bg-gray-100 dark:bg-gray-700 rounded">
        <p className="text-xs text-gray-600 dark:text-gray-400">
          This box should change color when theme changes
        </p>
      </div>
    </div>
  );
}
