'use client';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function Home() {
	const { status }: { status: string } = useSession();
	return (
		<>
			<Header />
			{status === 'authenticated' ? <Button onClick={() => signOut()}>Log Out</Button> : <Button onClick={() => signIn()}>Log In</Button>}
			<h1>Hello</h1>
		</>
	);
}
