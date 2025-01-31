'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormField } from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function SignIn() {
	const { push } = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true); // Set loading state saat login dimulai
		try {
			const target = e.target as HTMLFormElement;
			const email = (target.elements.namedItem('email') as HTMLInputElement).value;
			const password = (target.elements.namedItem('password') as HTMLInputElement).value;

			// Gunakan window.location.origin untuk membuat URL absolut
			const origin = typeof window !== 'undefined' ? window.location.origin : '';
			const callbackUrl = `${origin}/admin`;

			console.log('Callback URL:', callbackUrl);

			// Login menggunakan next-auth credentials
			const res = await signIn('credentials', {
				redirect: false,
				email,
				password,
				callbackUrl,
			});

			console.log('Sign-in response:', res);

			if (res?.error) {
				if (res.error === 'CredentialsSignin') {
					setError('Email atau password salah!');
				} else if (res.error === 'UserNotFound') {
					setError('Email belum terdaftar!');
				} else {
					setError('Terjadi kesalahan saat login. Coba lagi nanti.');
				}
			} else {
				const session = await fetch('/api/auth/session')
					.then((res) => res.json())
					.catch((err) => {
						console.error('Error fetching session:', err);
						alert('Gagal mendapatkan sesi.');
					});

				const role = session?.user?.role;

				if (role === 'admin') {
					push('/admin'); // Rute untuk admin
				} else if (role === 'member') {
					push('/articles'); // Rute untuk member
				} else {
					push('/'); // Default rute
				}
			}
		} catch (error) {
			console.error('Error during login:', error);
			setError('Terjadi kesalahan. Coba lagi nanti.');
		} finally {
			setIsLoading(false); // Set loading state kembali ke false setelah proses selesai
		}
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-96 md:w-1/3">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Masuk</CardTitle>
					<CardDescription>Masuk ke akun yang sudah ada</CardDescription>
				</CardHeader>
				<CardContent>
					<FormField action="/auth/sign-in" method="post" onSubmit={handleLogin}>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col">
								<label htmlFor="email">Email</label>
								<input type="email" name="email" id="email" placeholder="Masukkan email" required />
							</div>
							<div className="flex flex-col">
								<label htmlFor="password">Password</label>
								<input type={showPassword ? 'text' : 'password'} name="password" id="password" placeholder="Masukkan password" required />
							</div>
							<div className="grid">
								<label htmlFor="showPassword" className="flex items-center gap-2">
									<Checkbox checked={showPassword} onCheckedChange={(checked) => setShowPassword(!!checked)} />
									<p>Tampilkan password</p>
								</label>
							</div>

							{/* Menampilkan error jika ada */}
							{error && (
								<div className="mt-2 text-red-500 text-sm">
									<p>{error}</p>
								</div>
							)}
						</div>
						<Button type="submit" className="w-full mt-4" disabled={isLoading}>
							{isLoading ? (
								<div className="flex justify-center items-center gap-2">
									<span>Memuat...</span>
								</div>
							) : (
								'Masuk'
							)}
						</Button>
					</FormFi>
				</CardContent>
				<CardFooter>
					<p>
						Belum punya akun?{' '}
						<Link href={'/auth/sign-up'} className="text-primary">
							Daftar
						</Link>
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
