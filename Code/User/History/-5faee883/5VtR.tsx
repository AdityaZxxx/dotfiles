import { SessionProvider } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<SessionProvider>
				<h1>Admin Layout</h1>
				{children}
			</SessionProvider>
		</div>
	);
}
