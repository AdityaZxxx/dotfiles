import { Faq } from '@/components/views/faq';
import { GreatingSection } from '@/components/views/greating-section';
import { Teams } from '@/components/views/teams';

export default function Home() {
	return (
		<>
			<GreatingSection />
			<Teams />
			<Faq />
		</>
	);
}
