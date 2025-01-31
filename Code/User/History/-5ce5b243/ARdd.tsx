'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';

import Link from 'next/link';
import { useState } from 'react';

export default function SignIn() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false); // Menambahkan state untuk loading

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
								<input
									type={showPassword ? 'text' : 'password'} // Mengubah tipe input berdasarkan state showPassword
									name="password"
									id="password"
									placeholder="Masukkan password"
									required
								/>
							</div>
							{/* show password */}
							<div className="grid">
								<label htmlFor="showPassword" className="flex items-center gap-2">
									<Checkbox checked={showPassword} onCheckedChange={(checked) => setShowPassword(!!checked)} />
									<p>Tampilkan password</p>
								</label>
							</div>
						</div>
						<Button type="submit" className="w-full mt-4" disabled={isLoading}>
							{isLoading ? (
								<div className="flex justify-center items-center gap-2">
									<span>Memuat...</span>
								</div>
							) : (
								'Daftar'
							)}
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
