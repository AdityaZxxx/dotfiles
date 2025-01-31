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
import { ToastProvider, ToastViewport, Toast, ToastTitle, ToastDescription, ToastClose } from '@/components/ui/toast';

const formSchema = z.object({
	username: z.string().min(3, 'Username must be at least 3 characters').max(20, 'Username cannot exceed 20 characters'),
	email: z.string().email('Please enter a valid email address'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number'),
});

const RegisterForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [toastMessage, setToastMessage] = useState<string | null>(null);
	const [toastError, setToastError] = useState(false); // Status toast (error/success)
	const { push } = useRouter();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		try {
			const data = {
				email: values.email,
				password: values.password,
				name: values.username,
				phone: '',
				address: '',
			};

			const res = await fetch('/api/user', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			if (res.ok) {
				setToastMessage('Registration successful!');
				setToastError(false);
				form.reset();
				setTimeout(() => push('/auth/login'), 2000);
			} else {
				const errorData = await res.json();
				setToastMessage(errorData.message || 'Registration failed. Please try again.');
				setToastError(true);
			}
		} catch (error) {
			console.error('Error during sign-up:', error);
			setToastMessage('An unexpected error occurred. Please try again.');
			setToastError(true);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<ToastProvider>
			<Card className="w-2/3 max-w-md mx-auto">
				<CardHeader>
					<CardTitle className="text-2xl text-center">Create an account</CardTitle>
					<CardDescription className="text-center">Enter your details to register</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
							<FormField
								control={form.control}
								name="username"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Username</FormLabel>
										<FormControl>
											<Input placeholder="Enter username" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

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
								{isLoading ? 'Registering...' : 'Register'}
							</Button>
						</form>
					</Form>
					<p className="text-sm mt-2 text-muted-foreground">
						Already have an account?{' '}
						<Link className="underline font-semibold" href="/auth/login">
							Login
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
		</ToastProvider>
	);
};

export default RegisterForm;
