'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '../ui/button';

const Header = () => {
	const { status }: { status: string } = useSession();
	return (
		<header className="border-border flex h-16 items-center justify-between border-b-2 px-4 md:h-20 md:px-8">
			<Link href={'/'} className="text-2xl font-bold text-primary hover:cursor-pointer md:text-3xl">
				Adxx
			</Link>
			<div className="flex font-medium items-center gap-4">
				<Link href={'/about'}>About</Link>
				<Link href={'/contact'}>Contact</Link>
				{status === 'authenticated' ? <Button onClick={() => signOut()}>Log Out</Button> : <Button onClick={() => signIn()}>Log In</Button>}
			</div>
		</header>
	);
};

export default Header;
