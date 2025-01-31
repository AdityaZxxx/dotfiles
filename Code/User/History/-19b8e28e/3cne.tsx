'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';
import { ToastViewport } from '@/components/ui/toast';
import { signIn } from 'next-auth/react';

// Schema validasi menggunakan Zod
const formSchema = z.object({
	email: z.string().email('Please enter a valid email address'),
	password: z.string().min(8, 'Password must be at least 8 characters'),
});

const LoginForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [toastError, setToastError] = useState(false); // Status toast (error/success)
	const { push, query } = useRouter();

	const callbackUrl = query.callbackUrl || '/'; // Pastikan callbackUrl default adalah '/'.

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		setToastMessage(null); // Reset Toast
		try {
			const res = await signIn('credentials', {
				redirect: false,
				email: values.email,
				password: values.password,
				callbackUrl: callbackUrl as string,
			});

			if (res?.error) {
				setToastError(true);
				setToastMessage(res.error);
			} else {
				setToastError(false);
				setToastMessage('Login successful!');
				push(callbackUrl as string);
			}
		} catch (error) {
			console.error('Error during login:', error);
			setToastError(true);
			setToastMessage('Login failed. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<>
			<Card className="w-2/3 max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Login to your account</CardTitle>
					<CardDescription className="text-center">Enter your credentials to login</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input type="email" placeholder="Enter email" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input type="password" placeholder="Enter password" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button type="submit" className="w-full" disabled={isLoading}>
								{isLoading ? 'Logging in...' : 'Login'}
							</Button>
						</form>
					</Form>
					<p className="text-sm mt-2 text-muted-foreground">
						Don&apos;t have an account?{' '}
						<Link className="underline font-semibold" href="/auth/register">
							Register
						</Link>
					</p>
				</CardContent>
			</Card>

			{/* Toast Component */}
			{toastMessage && (
				<Toast className={toastError ? 'destructive' : ''}>
					<ToastTitle>{toastError ? 'Error' : 'Success'}</ToastTitle>
					<ToastDescription>{toastMessage}</ToastDescription>
					<ToastClose onClick={() => setToastMessage(null)} />
				</Toast>
			)}
			<ToastViewport />
		</>
	);
};

export default LoginForm;
