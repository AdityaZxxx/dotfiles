'use client';

import { useSession } from 'next-auth/react';
import { Session } from 'next-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Admin() {
	const { data: session, status } = useSession() as { data: (Session & { user: { role: string } }) | null; status: string };
	const router = useRouter();

	useEffect(() => {
		if (status === 'loading') {
			// Jika status loading, tidak melakukan apa pun
			return;
		}

		if (status === 'unauthenticated') {
			// Redirect ke halaman login jika tidak terautentikasi
			router.push('/auth/sign-in');
		} else if (session && session.user && session.user.role !== 'admin') {
			// Redirect ke halaman lain jika bukan admin
			router.push('/');
		}
	}, [router, session, status]);

	return <div>hello</div>;
}
