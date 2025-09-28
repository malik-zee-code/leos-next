import toast from "react-hot-toast";

// Toast utility functions for consistent messaging
export const toastUtils = {
  // Success messages
  success: {
    login: (userName?: string) =>
      toast.success(userName ? `Welcome back, ${userName}!` : "Login successful!"),
    signup: (userName?: string) =>
      toast.success(
        userName
          ? `Account created for ${userName}! Please login.`
          : "Account created successfully!"
      ),
    logout: () => toast.success("Logged out successfully!"),
    profileUpdate: () => toast.success("Profile updated successfully!"),
    passwordReset: () => toast.success("Password reset successful!"),
    generic: (message: string) => toast.success(message),
  },

  // Error messages
  error: {
    login: (message?: string) =>
      toast.error(message || "Login failed. Please check your credentials."),
    signup: (message?: string) => toast.error(message || "Signup failed. Please try again."),
    logout: () => toast.error("Logout failed, but you have been logged out locally."),
    sessionExpired: () => toast.error("Your session has expired. Please login again."),
    unauthorized: () => toast.error("Please login to access this page."),
    alreadyLoggedIn: () => toast("You are already logged in.", { icon: "ℹ️" }),
    networkError: () => toast.error("Network error. Please check your connection."),
    serverError: () => toast.error("Server error. Please try again later."),
    generic: (message: string) => toast.error(message),
  },

  // Info messages
  info: {
    loading: (message: string) => toast.loading(message),
    generic: (message: string) => toast(message, { icon: "ℹ️" }),
  },

  // Custom messages
  custom: (message: string, type: "success" | "error" | "loading" | "info" = "info") => {
    switch (type) {
      case "success":
        return toast.success(message);
      case "error":
        return toast.error(message);
      case "loading":
        return toast.loading(message);
      default:
        return toast(message);
    }
  },

  // Promise toast for async operations
  promise: <T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    }
  ) => {
    return toast.promise(promise, messages);
  },
};

export default toastUtils;
