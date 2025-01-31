import AuthProviders from '@/components/session-provider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProviders>
			<div>
				<h1>Admin Layout</h1>
				{children}
			</div>
		</AuthProviders>
	);
}
