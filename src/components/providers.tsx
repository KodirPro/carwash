"use client";

import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

interface IProviderProps {
  children: React.ReactNode;
  session: Session | null;
}

export function Providers({ children, session }: IProviderProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}
