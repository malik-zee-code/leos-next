import { getRequestConfig } from "next-intl/server";
import { notFound } from "next/navigation";

// Can be imported from a shared config
const locales = ["en", "ar", "zh", "es"];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  console.log("locale from request.ts", locale);
  console.log("typeof locale:", typeof locale);
  console.log("locale in locales?", locales.includes(locale || ""));

  // Ensure locale is a string and is one of our supported locales
  if (!locale || typeof locale !== "string" || !locales.includes(locale)) {
    console.log("Invalid locale detected:", locale, "using default 'en'");
    // Instead of notFound(), we'll use the default locale
    const validLocale = "en";

    return {
      messages: (await import(`../messages/${validLocale}.json`)).default as Record<string, string>,
      locale: validLocale,
    };
  }

  const validLocale = locale;
  console.log("validLocale:", validLocale);

  return {
    messages: (await import(`../messages/${validLocale}.json`)).default as Record<string, string>,
    locale: validLocale,
  };
});
