'use client';
import { signIn, signOut, useSession } from 'next-auth/react';
import { Button } from '../ui/button';

const Navbar = () => {
	const { data } = useSession();
	return (
		<>
			<div className="sticky top-0 z-50 flex justify-between items-center p-4">
				<Button onClick={() => (data ? signOut() : signIn())}>{data ? 'Logout' : 'Login'}</Button>
			</div>
		</>
	);
};

export default Navbar;
