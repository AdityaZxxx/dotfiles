'use client';
import { useSession } from 'next-auth/react';

export default function Admin() {
	const { data: session, status } = useSession();
	console.log(session, status);
	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
