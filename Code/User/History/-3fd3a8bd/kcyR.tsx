import Image from 'next/image';
import { Sidebar, SidebarHeader, SidebarMenu, SidebarMenuItem } from '../ui/sidebar';
import Link from 'next/link';

const AdminSidebar = () => {
	return (
		<Sidebar>
			<SidebarHeader>
				<Image src="/logo.png" alt="Logo" />
			</SidebarHeader>
			<SidebarMenu>
				<Link href="/dashboard">
					<SidebarMenuItem>Dashboard</SidebarMenuItem>
				</Link>
				<Link href="/articles">
					<SidebarMenuItem>Artikel</SidebarMenuItem>
				</Link>
				<Link href="/users">
					<SidebarMenuItem>Pengguna</SidebarMenuItem>
				</Link>
				<Link href="/settings">
					<SidebarMenuItem>Pengaturan</SidebarMenuItem>
				</Link>
			</SidebarMenu>
		</Sidebar>
	);
};

export default AdminSidebar;
