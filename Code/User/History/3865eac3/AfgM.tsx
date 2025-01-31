import LoginForm from '@/components/form/auth/login-form';
import { Suspense } from 'react';

const LoginPage = () => {
	return (
		<Suspense fallback="Loading...">
			<div className="flex items-center justify-center h-min my-10">
				<LoginForm />
			</div>
		</Suspense>
	);
};

export default LoginPage;
