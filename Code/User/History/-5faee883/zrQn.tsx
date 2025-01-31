'use client';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<SessionProvider>
			<div>
				<h1>Admin Layout</h1>
				{children}
			</div>
		</SessionProvider>
	);
}
