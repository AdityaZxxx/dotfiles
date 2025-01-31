'use client';
import { SessionProvider, useSession } from 'next-auth/react';

export default function Admin() {
	const { status } = useSession();
	console.log(status);
	return (
		<SessionProvider>
			<div>
				<h1>Hello from admin</h1>
			</div>
		</SessionProvider>
	);
}
