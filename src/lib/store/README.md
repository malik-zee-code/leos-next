# Redux Authentication Store

This directory contains the Redux store configuration and authentication slice for the LEOS application.

## Structure

- `store.ts` - Main Redux store configuration
- `slices/authSlice.ts` - Authentication state management
- `hooks.ts` - Typed Redux hooks

## Authentication Flow

### 1. Login Process

- User submits login form with email/password
- `loginUser` async thunk calls API
- On success: token stored in localStorage and Redux state
- User redirected to dashboard

### 2. Signup Process

- User submits signup form with user data
- `signupUser` async thunk calls API
- On success: user redirected to login page
- User must login separately after signup

### 3. Logout Process

- User clicks logout in header dropdown
- `logoutUser` async thunk calls logout API
- Token removed from localStorage and Redux state
- User redirected to login page

### 4. Token Persistence

- JWT token stored in localStorage as `accessToken`
- On app initialization, token loaded from localStorage
- Token validated by attempting to decode JWT
- Invalid tokens are automatically cleared

## Guards

### ProtectedRoute

- Wraps components that require authentication
- Redirects to `/auth/login` if not authenticated
- Shows loading screen while checking auth state

### GuestRoute

- Wraps components that should only be accessible to non-authenticated users
- Redirects to `/dashboard` if already authenticated
- Used for login/signup pages

## API Integration

The auth slice integrates with the LEOS API endpoints:

- `POST /api/auth/login` - User login
- `POST /api/auth/signup` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile

## Usage

```tsx
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { loginUser, logoutUser } from "@/lib/store/slices/authSlice";

function MyComponent() {
  const dispatch = useAppDispatch();
  const { user, isAuthenticated, isLoading } = useAppSelector((state) => state.auth);

  const handleLogin = async (credentials) => {
    try {
      await dispatch(loginUser(credentials)).unwrap();
      // User is now logged in
    } catch (error) {
      // Handle login error
    }
  };
}
```

## Environment Variables

Set the following environment variable:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Toast Notifications

The authentication system includes comprehensive toast notifications using `react-hot-toast`:

### Success Messages

- Login success with personalized greeting
- Signup success with user confirmation
- Logout confirmation
- Profile updates

### Error Messages

- Login failures with credential validation
- Signup errors with specific feedback
- Session expiration warnings
- Unauthorized access attempts
- Network and server errors

### Toast Configuration

- Custom styling with theme support
- Consistent positioning (top-right)
- Appropriate durations for different message types
- Success: 3 seconds
- Error: 5 seconds
- Info: 4 seconds

## Security Features

- JWT token validation
- Automatic token cleanup on logout
- Protected routes with guards
- Error handling for invalid tokens
- Rate limiting support (handled by API)
- Toast notifications for security events
