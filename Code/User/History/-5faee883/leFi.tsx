import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const { data: user, status } = useSession();
	console.log(user, status);

	return <div>{children}</div>;
}
