import { useSession } from 'next-auth/react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	const { user } = useSession();

	return <div>{children}</div>;
}
