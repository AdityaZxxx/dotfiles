'use client';
import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const { data: session, status } = useSession();
	console.log(session, status);

	return (
		<div>
			<h1>Admin Layout</h1>
			{children}
		</div>
	);
}
