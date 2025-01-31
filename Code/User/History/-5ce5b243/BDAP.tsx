'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

import Link from 'next/link';
// import { useRouter } from 'next/navigation';

export default function SignIn() {
	// const { push } = useRouter();
	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const fullname = (e.target as HTMLFormElement).fullname.value;
		const email = (e.target as HTMLFormElement).email.value;
		const password = (e.target as HTMLFormElement).password.value;

		console.log('Form data:', { fullname, email, password }); // Log untuk debugging

		await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ fullname, email, password }),
		});
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-96 md:w-1/3">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Daftar</CardTitle>
					<CardDescription>Buat akun baru</CardDescription>
				</CardHeader>
				<CardContent>
					{/* form untuk daftar */}
					<form action="/auth/sign-up" method="post" onSubmit={handleSignUp}>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col">
								<label htmlFor="name">Nama</label>
								<input type="text" name="fullname" id="fullname" placeholder="Masukkan nama" required />
							</div>
							<div className="flex flex-col">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" id="email" placeholder="Masukkan email" required />
							</div>
							<div className="flex flex-col">
								<label htmlFor="password">Password</label>
								<input type="password" name="password" id="password" placeholder="Masukkan password" required />
							</div>
						</div>
						<Button type="submit" className="w-full mt-4">
							Daftar
						</Button>
					</form>
				</CardContent>
				<CardFooter>
					<p>
						Sudah punya akun?{' '}
						<Link href={'/auth/sign-in'} className="text-primary">
							Masuk
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
