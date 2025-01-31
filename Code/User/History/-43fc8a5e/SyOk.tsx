'use client';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function Home() {
	const { status }: { status: string } = useSession();
	return (
		<div>
			<Header />

			<h1>Hello</h1>
		</div>
	);
}
