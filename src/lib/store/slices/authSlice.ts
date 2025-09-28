import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { buildApiUrl, API_CONFIG } from "@/lib/config/api";
import { toastUtils } from "@/lib/utils/toast";

// Types
export interface User {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
}

// API Response types (snake_case)
export interface ApiUser {
  id: string;
  fullName: string;
  email: string;
  role: string;
  isActive: boolean;
  lastLogin?: string;
}

export interface JwtTokenPayload {
  id: string;
  iat: number;
  exp: number;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  error: string | null;
  wasIntentionalLogout: boolean;
  wasSuccessfulLogin: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  fullName: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    user: ApiUser;
  };
}

export interface SignupResponse {
  success: boolean;
  message: string;
  data: User;
}

// Initial state
const initialState: AuthState = {
  user: null,
  token: null,
  isLoading: true, // Start with loading true to prevent premature redirects
  isAuthenticated: false,
  error: null,
  wasIntentionalLogout: false,
  wasSuccessfulLogin: false,
};

// Async thunks
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      console.log("Login attempt with credentials:", credentials);
      const url = buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGIN);
      console.log("Login API URL:", url);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      console.log("Login response status:", response.status);
      console.log("Login response headers:", response.headers);

      const data = await response.json();
      console.log("Login response data:", data);

      if (!response.ok) {
        console.error("Login failed with status:", response.status);
        console.error("Login error data:", data);
        return rejectWithValue(data.message || "Login failed");
      }

      console.log("Login successful, returning data:", data);
      return data as AuthResponse;
    } catch (error) {
      console.error("Login network error:", error);
      return rejectWithValue("Network error occurred");
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signupUser",
  async (userData: SignupData, { rejectWithValue }) => {
    try {
      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.SIGNUP), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Signup failed");
      }

      return data as SignupResponse;
    } catch {
      return rejectWithValue("Network error occurred");
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logoutUser", async (_, { getState }) => {
  try {
    const state = getState() as { auth: AuthState };
    const token = state.auth.token;

    if (token) {
      await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.LOGOUT), {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
    }

    return true;
  } catch {
    // Even if logout API fails, we should clear local state
    return true;
  }
});

export const getUserProfile = createAsyncThunk(
  "auth/getUserProfile",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const token = state.auth.token;

      if (!token) {
        return rejectWithValue("No token available");
      }

      const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.AUTH.PROFILE), {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        return rejectWithValue(data.message || "Failed to fetch profile");
      }

      return data.data;
    } catch {
      return rejectWithValue("Network error occurred");
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    initializeAuth: (state) => {
      // Initialize auth state from localStorage
      if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
          try {
            // JWT token only contains user ID, not full user data
            const decodedToken = jwtDecode<JwtTokenPayload>(token);
            console.log("Decoded JWT token:", decodedToken); // Debug log

            // Check if token is expired
            const currentTime = Math.floor(Date.now() / 1000);
            if (decodedToken.exp < currentTime) {
              console.log("Token is expired, removing from localStorage");
              localStorage.removeItem("accessToken");
              return;
            }

            // Store token and mark as authenticated
            state.token = token;
            state.isAuthenticated = true;

            // Try to load user data from localStorage
            const userDataString = localStorage.getItem("userData");
            if (userDataString) {
              try {
                state.user = JSON.parse(userDataString);
                console.log("User data loaded from localStorage:", state.user);
              } catch (error) {
                console.error("Failed to parse user data from localStorage:", error);
              }
            }
          } catch (error) {
            // Log the error to understand what's happening
            console.error("JWT decode error:", error);
            console.error("Token that failed to decode:", token);
            // Invalid token, clear it
            localStorage.removeItem("accessToken");
          }
        }
      }
      // Always set loading to false after initialization
      state.isLoading = false;
      // Reset flags
      state.wasIntentionalLogout = false;
      state.wasSuccessfulLogin = false;
    },
    clearAuth: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }
    },
  },
  extraReducers: (builder) => {
    // Login
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;

        // Debug log to see actual API response structure
        console.log("Login API response:", action.payload);
        console.log("API user data:", action.payload.data.user);

        // Transform API response to our User interface
        const apiUser = action.payload.data.user;
        state.user = {
          id: apiUser.id,
          fullName: apiUser.fullName,
          email: apiUser.email,
          role: apiUser.role,
          isActive: apiUser.isActive,
          lastLogin: apiUser.lastLogin,
        };
        state.token = action.payload.data.token;
        state.error = null;
        state.wasSuccessfulLogin = true; // Mark as successful login

        // Store token and user data in localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem("accessToken", action.payload.data.token);
          localStorage.setItem("userData", JSON.stringify(state.user));
          console.log("Token stored in localStorage:", action.payload.data.token);
          console.log("User data stored in localStorage:", state.user);
        }

        // Show success toast
        toastUtils.success.login(state.user.fullName);
      })
      .addCase(loginUser.rejected, (state, action) => {
        console.error("Login rejected with payload:", action.payload);
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload as string;

        // Show error toast
        toastUtils.error.login(action.payload as string);
      });

    // Signup
    builder
      .addCase(signupUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.wasSuccessfulLogin = true; // Mark as successful login (for signup -> login flow)

        // Show success toast
        toastUtils.success.signup(action.payload.data.fullName);
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;

        // Show error toast
        toastUtils.error.signup(action.payload as string);
      });

    // Logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      state.wasIntentionalLogout = true; // Mark as intentional logout

      // Clear token and user data from localStorage
      if (typeof window !== "undefined") {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("userData");
      }

      // Show logout toast
      toastUtils.success.logout();
    });

    // Get user profile
    builder
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;

        // If profile fetch fails, user might need to re-authenticate
        const errorMessage = action.payload as string;
        if (
          errorMessage === "No token available" ||
          errorMessage?.includes("Invalid token") ||
          errorMessage?.includes("Access denied")
        ) {
          state.isAuthenticated = false;
          state.user = null;
          state.token = null;
          if (typeof window !== "undefined") {
            localStorage.removeItem("accessToken");
          }

          // Show session expired toast
          toastUtils.error.sessionExpired();
        }
      });
  },
});

export const { clearError, initializeAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
