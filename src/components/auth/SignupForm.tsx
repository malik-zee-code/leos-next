"use client";

import { useForm } from "react-hook-form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { yupResolver } from "@hookform/resolvers/yup";
import { RiUserLine, RiMailLine, RiPhoneLine, RiLockLine } from "@remixicon/react";
import { Button } from "@/components/Button";
import { InputWithIcon } from "@/components/InputWithIcon";
import { signupSchema, type SignupFormData } from "@/lib/validation/authValidation";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { signupUser, clearError } from "@/lib/store/slices/authSlice";
import { useEffect } from "react";
// import { toastUtils } from "@/lib/utils/toast";

export function SignupForm() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, isAuthenticated } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignupFormData>({
    resolver: yupResolver(signupSchema),
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

  const onSubmit = async (data: SignupFormData) => {
    try {
      const result = await dispatch(
        signupUser({
          fullName: data.fullName,
          email: data.email,
          password: data.password,
        })
      ).unwrap();

      if (result) {
        // Reset form on success
        reset();
        // Toast will be shown by the auth slice
        // Show success message or redirect to login
        router.push(`/${locale}/auth/login?message=signup_success`);
      }
    } catch (error: unknown) {
      console.error("Signup error:", error);
      // const errorMessage = error instanceof Error ? error.message : "Signup failed";
      // toastUtils.error.signup(errorMessage);
    }
  };

  return (
    <div className="mx-auto w-full max-w-md">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-[#B8860B] mb-2">{t("signUp")}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm">{t("signupSubtitle")}</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-4">
        {/* Full Name Field */}
        <div>
          <InputWithIcon
            type="text"
            placeholder={t("fullNamePlaceholder")}
            hasError={!!errors.fullName}
            icon={<RiUserLine />}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.fullName.message}</p>
          )}
        </div>

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

        {/* Phone Number Field */}
        <div>
          <InputWithIcon
            type="tel"
            placeholder={t("phonePlaceholder")}
            hasError={!!errors.phone}
            icon={<RiPhoneLine />}
            {...register("phone")}
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone.message}</p>
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

        {/* Confirm Password Field */}
        <div>
          <InputWithIcon
            type="password"
            placeholder={t("confirmPasswordPlaceholder")}
            hasError={!!errors.confirmPassword}
            icon={<RiLockLine />}
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Signup Button */}
        <Button
          type="submit"
          isLoading={isLoading}
          loadingText={t("signingUp")}
          className="w-full bg-[#B8860B] hover:bg-[#A0780A] dark:bg-[#B8860B] dark:hover:bg-[#A0780A] dark:text-white text-white font-semibold py-3 px-4 rounded-lg transition-colors mt-6"
        >
          {t("signUpButton")}
        </Button>

        {/* Login Link */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-300">
          {t("haveAccount")}{" "}
          <Link
            href={`/${locale}/auth/login`}
            className="text-[#B8860B] hover:underline font-medium"
          >
            {t("login")}
          </Link>
        </div>
      </form>
    </div>
  );
}
