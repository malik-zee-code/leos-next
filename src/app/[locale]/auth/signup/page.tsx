import { SignupForm } from "@/components/auth/SignupForm";
import { GuestRoute } from "@/components/guards/GuestRoute";

export default function SignupPage() {
  return (
    <GuestRoute>
      <SignupForm />
    </GuestRoute>
  );
}
