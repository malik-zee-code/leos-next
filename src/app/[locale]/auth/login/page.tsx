import { LoginForm } from "@/components/auth/LoginForm";
import { GuestRoute } from "@/components/guards/GuestRoute";

export default function LoginPage() {
  return (
    <GuestRoute>
      <LoginForm />
    </GuestRoute>
  );
}
