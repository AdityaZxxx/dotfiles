'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form'; // Import useForm and Controller
import { Input } from '@/components/ui/input';

export default function SignIn() {
	const { push } = useRouter();
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);

	// Define form data type
	interface FormData {
		email: string;
		password: string;
	}

	// Initialize the form
	const { control, handleSubmit } = useForm<FormData>();

	const handleLogin = async (data: { email: string; password: string }) => {
		setIsLoading(true);
		try {
			const { email, password } = data;

			const origin = typeof window !== 'undefined' ? window.location.origin : '';
			const callbackUrl = `${origin}/admin`;

			const res = await signIn('credentials', {
				redirect: false,
				email,
				password,
				callbackUrl,
			});

			if (res?.error) {
				if (res.error === 'CredentialsSignin') {
					setError('Email atau password salah!');
				} else if (res.error === 'User NotFound') {
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
					push('/admin');
				} else if (role === 'member') {
					push('/articles');
				} else {
					push('/');
				}
			}
		} catch (error) {
			console.error('Error during login:', error);
			setError('Terjadi kesalahan. Coba lagi nanti.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-96 md:w-1/3">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Masuk</CardTitle>
					<CardDescription>Masuk ke akun yang sudah ada</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<form onSubmit={handleSubmit(handleLogin)}>
						<div className="">
							<label htmlFor="email">Email</label>
							<Controller name="email" control={control} defaultValue="" render={({ field }) => <Input {...field} type="email" placeholder="Masukkan email" required />} />
						</div>
						<div>
							<label htmlFor="password">Password</label>
							<Controller name="password" control={control} defaultValue="" render={({ field }) => <Input {...field} type={showPassword ? 'text' : 'password'} placeholder="Masukkan password" required />} />
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
						<Button type="submit" className="w-full mt-4" disabled={isLoading}>
							{isLoading ? (
								<div className="flex justify-center items-center gap-2">
									<span>Memuat...</span>
								</div>
							) : (
								'Masuk'
							)}
						</Button>
					</form>
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
