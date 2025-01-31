'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignIn() {
	const { push } = useRouter();
	const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const target = e.target as HTMLFormElement;
			const res = await signIn('credentials', {
				redirect: false,
				email: (target.elements.namedItem('email') as HTMLInputElement).value,
				password: (target.elements.namedItem('password') as HTMLInputElement).value,
				callbackUrl: '/admin',
			});
			if (res?.error) {
				push('/auth/sign-in');
			} else {
				console.log(res);
			}
		} catch (error) {
			if (error instanceof Error) {
				console.log(error.message);
			}
		}
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
					<form action="/auth/sign-up" method="post" onSubmit={handleLogin}>
						<div className="flex flex-col gap-2">
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
