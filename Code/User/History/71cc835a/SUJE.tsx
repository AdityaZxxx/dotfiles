'use client';

import { z } from 'zod';

const formSchema = z.object({
	username: z.string().min(2).max(50),
});
const RegisterView = () => {
	return (
		<div>
			<h1>Register</h1>
			<div></div>
		</div>
	);
};

export default RegisterView;
