import { Button } from '@/components/ui/button';
import { DashboardNav } from '@/components/ui/dashboard/DashboardNav';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { MenuIcon } from 'lucide-react';
import { ReactNode } from 'react';

export default function DashboardLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex w-full flex-col max-w-7 px-4 sm:px-6 lg:px-8">
			<header className="sticky top-0 flex h-16 items-center justify-between gap-4 border-b border-gray-200 bg-white px-4">
				<nav className="hidden font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
					<DashboardNav />
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button>
							<MenuIcon size={24} />
						</Button>
					</SheetTrigger>
				</Sheet>
			</header>
			{children}
		</div>
	);
}
