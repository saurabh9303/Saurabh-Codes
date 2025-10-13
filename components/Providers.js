'use client';

import { SessionProvider } from "next-auth/react";
import { ProgressProvider } from "./ProgressContext";

export default function Providers({ children, session }) {
    return (
        <SessionProvider session={session}>
            <ProgressProvider>{children}</ProgressProvider>
        </SessionProvider>
    );
}
