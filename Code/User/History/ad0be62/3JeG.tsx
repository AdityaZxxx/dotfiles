'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import {  useEffect } from 'react';

export default function Admin() {
	const { status } = useSession();
	const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/auth/sign-in');{
        }
    }, [router,status]);
	return (
		<div>
			<h1>Hello from admin</h1>
		</div>
	);
}
