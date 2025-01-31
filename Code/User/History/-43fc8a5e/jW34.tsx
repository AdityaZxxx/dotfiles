import Header from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

export default function Home() {
	return (
		<div>
			<Header />
			<Button onClick={() => signOut()} className="w-full mt-4">
				Keluar
			</Button>
			<h1>Hello</h1>
		</div>
	);
}
