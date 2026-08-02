import { Suspense } from "react";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoadingIndicator } from "@/components/ui/spinner";

import LoginPage from "./login-page";

export default function Page() {
  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access your portfolio, markets, and connected exchanges."
    >
      <Suspense
        fallback={
          <div className="flex justify-center py-12">
            <LoadingIndicator label="Loading" className="text-sm text-muted-foreground" />
          </div>
        }
      >
        <LoginPage />
      </Suspense>
    </AuthShell>
  );
}
