import AdminHeader from '@/components/layout/admin-header';
import AdminSidebar from '@/components/layout/admin-sidebar';
import AuthProviders from '@/components/session-provider';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
	return (
		<AuthProviders>
			<div>
				<AdminHeader />
				<SidebarProvider>
					<AdminSidebar />
				</SidebarProvider>
				{children}
			</div>
		</AuthProviders>
	);
}
