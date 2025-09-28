import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LocaleProvider } from "@/lib/context/LocaleContext";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { NextIntlClientProvider } from "next-intl";
import { Inter } from "next/font/google";
import "./globals.css";
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://yoururl.com"),
  keywords: [],
  authors: [
    {
      name: "yourname",
      url: "",
    },
  ],
  creator: "yourname",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} overflow-y-scroll overflow-x-hidden scroll-auto antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <ReduxProvider>
          <ThemeProvider defaultTheme="system" attribute="class">
            <LocaleProvider>
              <NextIntlClientProvider locale="en" messages={{}}>
                {children}
                <ToastProvider />
              </NextIntlClientProvider>
            </LocaleProvider>
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
