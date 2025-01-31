import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem } from 'shadcn-ui';

const AdminSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader>
				<img src="/logo.png" alt="Logo" />
			</SidebarHeader>
			<SidebarMenu>
				<SidebarMenuItem href="/dashboard">Dashboard</SidebarMenuItem>
				<SidebarMenuItem href="/articles">Artikel</SidebarMenuItem>
				<SidebarMenuItem href="/users">Pengguna</SidebarMenuItem>
				<SidebarMenuItem href="/settings">Pengaturan</SidebarMenuItem>
			</SidebarMenu>
		</Sidebar>
	);
};

export default AdminSidebar;
