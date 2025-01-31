'use client';
import { useSession } from 'next-auth/react';

export default function Admin() {
	const { status } = useSession();
	console.log(status);
	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
