'use client';

import { SessionProvider } from 'next-auth/react';

export default function Providers({ children, ...props: session: ...props }: { children: React.ReactNode }) {
	return <SessionProvider>{children}</SessionProvider>;
}
