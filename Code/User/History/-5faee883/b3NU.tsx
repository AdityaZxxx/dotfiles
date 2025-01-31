import AdminHeader from '@/components/layout/admin-header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import AuthProviders from '@/components/session-provider';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProviders>
			<div>
				<AdminHeader />
				<AdminSidebar />
				{children}
			</div>
		</AuthProviders>
	);
}
