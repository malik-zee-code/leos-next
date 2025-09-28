"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiUserLine, RiLockLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { InputWithIcon } from "@/components/InputWithIcon";
import { loginSchema, type LoginFormData } from "@/lib/validation/authValidation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser, clearError } from "@/lib/store/slices/authSlice";
import { useEffect } from "react";
// import { toastUtils } from "@/lib/utils/toast";

export function LoginForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
    mode: "onBlur",
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/dashboard`);
    }
  }, [isAuthenticated, router, locale]);

  // Clear errors when component mounts
  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      const result = await dispatch(loginUser(data)).unwrap();
      if (result) {
        // Toast will be shown by the auth slice
        router.push(`/${locale}/dashboard`);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      // const errorMessage = error instanceof Error ? error.message : "Login failed";
      // toastUtils.error.login(errorMessage);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#B8860B] mb-2">{t("welcome")}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{t("loginSubtitle")}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
        {/* Email Field */}
        <div>
          <InputWithIcon
            type="email"
            placeholder={t("emailPlaceholder")}
            hasError={!!errors.email}
            icon={<RiUserLine />}
            {...register("email")}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <InputWithIcon
            type="password"
            placeholder={t("passwordPlaceholder")}
            hasError={!!errors.password}
            icon={<RiLockLine />}
            {...register("password")}
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <Link
            href={`/${locale}/auth/forgot-password`}
            className="text-sm text-[#B8860B] hover:underline"
          >
            {t("forgotPassword")}
          </Link>
        </div>

        {/* Login Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={t("loggingIn")}
          className="w-full bg-[#B8860B] hover:bg-[#A0780A] dark:bg-[#B8860B] dark:hover:bg-[#A0780A] dark:text-white text-white font-semibold py-3 px-4 rounded-lg transition-colors"
        >
          {t("loginButton")}
        </Button>

        {/* Sign Up Link */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          {t("noAccount")}{" "}
          <Link
            href={`/${locale}/auth/signup`}
            className="text-[#B8860B] hover:underline font-medium"
          >
            {t("signUp")}
          </Link>
        </div>
      </form>
    </div>
  );
}
