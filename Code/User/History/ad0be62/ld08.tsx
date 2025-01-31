'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function Admin() {
	const { data: session, status }: { data: any; status: string } = useSession();
	const router = useRouter();

	useEffect(() => {
		if (status === 'unauthenticated') {
			router.push('/auth/sign-in');
		} else {
			if (session !== undefined && session.user.role !== 'admin') {
				router.push('/');
			}
		}
	}, [router, session, session.user.role, status]);

	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
