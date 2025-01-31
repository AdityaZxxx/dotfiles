import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';

export default function DashboardLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<div className="flex w-full flex-col max-w-7 mx-auto px-4 sm:px-6 lg:px-8">
			<header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b bg-white">
				<DashboardNav />
			</header>
		</div>
	);
}
