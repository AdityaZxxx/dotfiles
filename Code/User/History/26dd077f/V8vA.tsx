import Header from '@/components/layout/header';

export default function ArticlesLayout({ children }: { children: React.ReactNode }) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
