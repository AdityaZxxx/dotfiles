import RegisterForm from '@/components/form/auth/register/register-form';

const RegisterPage = () => {
	return (
		<div className="flex items-center justify-center h-screen">
			<div className="w-full max-w-md px-4 py-6 max-h-screen">
				<RegisterForm />
			</div>
		</div>
	);
};

export default RegisterPage;
