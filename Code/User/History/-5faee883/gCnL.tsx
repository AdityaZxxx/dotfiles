import AdminHeader from '@/components/layout/admin-header';

import AuthProviders from '@/components/session-provider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProviders>
			<div>
				<AdminHeader />

				{children}
			</div>
		</AuthProviders>
	);
}
