"use client";

import { Toaster } from "react-hot-toast";

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={8}
      containerClassName=""
      containerStyle={{}}
      toastOptions={{
        // Default options for all toasts
        duration: 4000,
        style: {
          background: "var(--toast-bg, #fff)",
          color: "var(--toast-color, #000)",
          borderRadius: "8px",
          border: "1px solid var(--toast-border, #e5e7eb)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        },
        // Success toast styling
        success: {
          duration: 3000,
          style: {
            background: "#f0fdf4",
            color: "#166534",
            border: "1px solid #bbf7d0",
          },
          iconTheme: {
            primary: "#22c55e",
            secondary: "#fff",
          },
        },
        // Error toast styling
        error: {
          duration: 5000,
          style: {
            background: "#fef2f2",
            color: "#dc2626",
            border: "1px solid #fecaca",
          },
          iconTheme: {
            primary: "#ef4444",
            secondary: "#fff",
          },
        },
        // Loading toast styling
        loading: {
          style: {
            background: "#f8fafc",
            color: "#475569",
            border: "1px solid #cbd5e1",
          },
        },
        // Info toast styling
        custom: {
          duration: 4000,
          style: {
            background: "#eff6ff",
            color: "#1d4ed8",
            border: "1px solid #bfdbfe",
          },
          iconTheme: {
            primary: "#3b82f6",
            secondary: "#fff",
          },
        },
      }}
    />
  );
}
