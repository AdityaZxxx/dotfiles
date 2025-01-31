import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return <div className="flex w-full flex-col max-w-7 mx-auto px-4 sm:px-6 lg:px-8">{children}</div>;
}
