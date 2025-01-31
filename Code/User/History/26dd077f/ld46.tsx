'use client';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { signIn, signOut, useSession } from 'next-auth/react';

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
	const { status }: { status: string } = useSession();
	return (
		<div>
			<Header />
			{status === 'authenticated' ? <Button onClick={() => signOut()}>Log Out</Button> : <Button onClick={() => signIn()}>Log In</Button>}
			{children}
		</div>
	);
}
