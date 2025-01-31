import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex flex-col ">
			<header>
				<DashboardNav />
			</header>
			{children}
		</div>
	);
}
