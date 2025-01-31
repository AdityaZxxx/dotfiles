import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div>
			<h1>hello</h1>
			{children}
		</div>
	);
}
