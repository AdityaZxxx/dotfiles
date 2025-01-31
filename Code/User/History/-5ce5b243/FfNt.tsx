'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';

export default function SignUp() {
	const [showPassword, setShowPassword] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false); // State untuk loading
	const [error, setError] = useState<string | null>(null); // State untuk menangani error

	const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null); // Reset error saat proses submit dimulai

		const fullname = (e.target as HTMLFormElement).fullname.value;
		const email = (e.target as HTMLFormElement).email.value;
		const password = (e.target as HTMLFormElement).password.value;

		// Validasi client-side sebelum mengirimkan data
		if (!fullname || !email || !password) {
			setError('Semua kolom harus diisi!');
			setIsLoading(false);
			return;
		}

		// Kirim data ke API untuk registrasi
		try {
			const response = await fetch('/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ fullname, email, password }),
			});

			if (!response.ok) {
				const errorData = await response.json();
				setError(errorData.message || 'Gagal membuat akun. Coba lagi!');
			} else {
				// Berhasil registrasi, alihkan pengguna atau beri tahu mereka
				alert('Akun berhasil dibuat! Silakan masuk.');
				// Anda dapat menavigasi pengguna ke halaman login atau login otomatis di sini
			}
		} catch (error) {
			console.error('Error during sign-up:', error);
			setError('Terjadi kesalahan. Coba lagi nanti.');
		} finally {
			setIsLoading(false); // Set loading state kembali ke false setelah proses selesai
		}
	};

	// Define form data type
	interface FormData {
		fullname: string;
		email: string;
		password: string;
	}

	// Initialize the form
	const { control, handleSubmit } = useForm<FormData>();

	return (
		<div className="flex h-screen items-center justify-center">
			<Card className="w-96 md:w-1/3">
				<CardHeader>
					<CardTitle className="text-2xl text-primary">Daftar</CardTitle>
					<CardDescription>Buat akun baru</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Form untuk daftar */}
					<form onSubmit={handleSubmit(handleSignUp)}>
						<div className="flex flex-col gap-2">
							<div className="flex flex-col">
								<label htmlFor="fullname">Nama</label>
								<input type="text" name="fullname" id="fullname" placeholder="Masukkan nama" required />
							</div>
							<div>
								<label htmlFor="email">Email</label>
								<Controller name="email" control={control} defaultValue="" render={({ field }) => <Input {...field} type="email" placeholder="Masukkan email" required />} />
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
							{/* Show password */}
							<div className="grid pt-2 pb-4">
								<label htmlFor="showPassword" className="flex items-center gap-2">
									<Checkbox checked={showPassword} onCheckedChange={(checked) => setShowPassword(!!checked)} />
									<p>Tampilkan password</p>
								</label>
							</div>

							{/* Tampilkan error jika ada */}
							{error && <p className="text-red-500 text-sm mt-2">{error}</p>}
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
