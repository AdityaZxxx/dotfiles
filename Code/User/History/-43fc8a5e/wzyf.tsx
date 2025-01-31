'use client';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { login, logout } = useSession();
	return (
		<div>
			<Header />
			{login && <Button onClick={() => signOut()}>Log Out</Button>}

			<h1>Hello</h1>
		</div>
	);
}
