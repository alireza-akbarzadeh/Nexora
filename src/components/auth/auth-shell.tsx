import { AuthLiveMarkets } from "@/components/auth/auth-live-markets";
import Link from "next/link";
import {
  ArrowLeft,
  Lock,
  ShieldCheck,
  Zap,
} from "lucide-react";

type AuthShellProps = {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  backHref?: string;
};

export function AuthShell({
  children,
  title,
  subtitle,
  backHref = "/",
}: AuthShellProps) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <div className="grid-bg absolute inset-0 opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="animate-pulse-glow absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[color-mix(in_srgb,var(--lime)_12%,transparent)] blur-3xl" />
      <div
        className="animate-pulse-glow absolute right-0 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[color-mix(in_srgb,var(--violet)_14%,transparent)] blur-3xl"
        style={{ animationDelay: "1.2s" }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-6 py-8 lg:flex-row lg:items-center lg:gap-16 lg:py-12">
        <aside className="mb-10 hidden flex-1 lg:mb-0 lg:block">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="gradient-primary glow-primary flex h-9 w-9 items-center justify-center rounded-lg">
              <div className="h-4 w-4 rounded-sm bg-background/90" />
            </div>
            <span className="font-display text-xl font-bold tracking-tight">Nexora</span>
          </Link>

          <div className="mt-12 max-w-md">
            <div className="glass mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-muted-foreground">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-profit" />
              Institutional-grade security
            </div>
            <h1 className="font-display text-4xl leading-tight font-bold tracking-tight xl:text-5xl">
              Secure access to your{" "}
              <span className="gradient-text">trading terminal</span>
            </h1>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Encrypted sessions, optional TOTP two-factor authentication, and
              exchange keys protected at rest.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                { icon: ShieldCheck, label: "SOC 2 ready", value: "Vault custody" },
                { icon: Zap, label: "12ms execution", value: "Global engine" },
                { icon: Lock, label: "2FA enabled", value: "Authenticator app" },
              ].map((item) => (
                <div key={item.label} className="glass rounded-xl p-3">
                  <item.icon className="mb-2 h-4 w-4 text-violet" />
                  <div className="text-[10px] tracking-wide text-muted-foreground uppercase">
                    {item.label}
                  </div>
                  <div className="text-xs font-medium">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          <AuthLiveMarkets />
        </aside>

        <div className="w-full flex-1 lg:max-w-md">
          <div className="mb-6 flex items-center justify-between lg:hidden">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="gradient-primary flex h-8 w-8 items-center justify-center rounded-lg">
                <div className="h-3.5 w-3.5 rounded-sm bg-background/90" />
              </div>
              <span className="font-display font-bold">Nexora</span>
            </Link>
            <Link
              href={backHref}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Back
            </Link>
          </div>

          <div className="card-elevated relative overflow-hidden rounded-3xl border border-white/[0.08] p-6 shadow-[var(--shadow-elevated)] sm:p-8">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--violet)_50%,transparent)] to-transparent" />
            <div className="mb-6">
              <h2 className="font-display text-2xl font-bold tracking-tight">{title}</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">{subtitle}</p>
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
