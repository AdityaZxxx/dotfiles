'use client';
import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';

export default function Home() {
	const { data: session, status }: { data: any; status: string } = useSession();
	return (
		<div>
			<Header />

			<h1>Hello</h1>
		</div>
	);
}
