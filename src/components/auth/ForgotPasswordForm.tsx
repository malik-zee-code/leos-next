"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiMailLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { InputWithIcon } from "@/components/InputWithIcon";
import { forgotPasswordSchema, type ForgotPasswordFormData } from "@/lib/validation/authValidation";

export function ForgotPasswordForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedEmail, setSubmittedEmail] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordFormData>({
    resolver: yupResolver(forgotPasswordSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      // Handle forgot password logic here
      console.log("Forgot password attempt:", data);
      setSubmittedEmail(data.email);
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  if (isSubmitted) {
    return (
      <div className="mx-auto w-full max-w-md text-center">
        <div className="mb-6">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
            <svg
              className="h-6 w-6 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#B8860B] mb-2">{t("checkEmail")}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6">
          {t("resetLinkSent", { email: submittedEmail })}
        </p>

        <div className="space-y-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("noEmailReceived")}{" "}
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-[#B8860B] hover:underline"
            >
              {t("tryAgain")}
            </button>
          </p>

          <Link
            href={`/${locale}/auth/login`}
            className="block text-sm text-[#B8860B] hover:underline"
          >
            {t("backToLogin")}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#B8860B] mb-2">{t("forgotPassword")}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{t("forgotPasswordSubtitle")}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Email Field */}
        <div>
          <InputWithIcon
            type="email"
            placeholder={t("emailPlaceholder")}
            hasError={!!errors.email}
            icon={<RiMailLine />}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          isLoading={isSubmitting}
          loadingText={t("sendingResetLink")}
          className="w-full bg-[#B8860B] hover:bg-[#A0780A] dark:bg-[#B8860B] dark:hover:bg-[#A0780A] dark:text-white text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {t("sendResetLink")}
        </Button>

        {/* Back to Login Link */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          {t("rememberPassword")}{" "}
          <Link
            href={`/${locale}/auth/login`}
            className="text-[#B8860B] hover:underline font-medium"
          >
            {t("backToLogin")}
          </Link>
        </div>
      </form>
    </div>
  );
}
