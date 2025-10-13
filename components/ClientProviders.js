'use client';

import { SessionProvider } from "next-auth/react";
import { ProgressProvider } from "./ProgressContext";

export default function ClientProviders({ children }) {
  return (
    <SessionProvider>
      <ProgressProvider>{children}</ProgressProvider>
    </SessionProvider>
  );
}