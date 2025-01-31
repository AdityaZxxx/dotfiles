'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
	const { data: session, status } = useSession();
	const router = useRouter();

	useEffect(() => {
		// Redirect jika tidak diautentikasi
		if (status === 'unauthenticated') {
			router.push('/auth/sign-in');
		}

		// Redirect jika bukan admin
		if (status === 'authenticated' && session?.user.role !== 'admin') {
			router.push('/');
		}
	}, [router, session?.user?.role, status]);

	if (status === 'loading') {
		return <div>Loading...</div>; // Loading state untuk pengalaman UX yang lebih baik
	}

	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
