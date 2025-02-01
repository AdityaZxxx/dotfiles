import Image from 'next/image';

export const GreatingSection = () => {
	return (
		<>
			<div className="max-w-5xl max-md:max-w-xl mx-auto font-[sans-serif] my-4">
				<div className="text-center max-w-2xl mx-auto">
					<h2 className="text-gray-800 text-3xl font-extrabold text-center mb-6">Selamat Datang di Sekolah</h2>
					<p className="text-gray-600 text-sm">Unlock a world of possibilities with our exclusive features. Explore how our unique offerings can transform your journey and empower you to achieve more.</p>
				</div>

				<div className="mt-16 px-2">
					<div className="grid md:grid-cols-2 items-center gap-16">
						<div>
							<Image width={500} height={500} src="/school.png" className="w-full object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]" alt="" />
						</div>
						<div>
							<h3 className="text-gray-800 text-xl font-bold mb-4">Customization</h3>
							<p className="text-gray-600 text-sm">Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad consequat id. Dolore et sint mollit in nisi tempor culpa consectetur. Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad consequat id.</p>
						</div>
						<div className="max-md:order-1">
							<h3 className="text-gray-800 text-xl font-bold mb-4">Performance</h3>
							<p className="text-gray-600 text-sm">Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad consequat id. Dolore et sint mollit in nisi tempor culpa consectetur. Qui elit labore in nisi dolore tempor anim laboris ipsum ad ad consequat id.</p>
						</div>
						<div>
							<Image height={500} width={500} alt="" src="/school.png" className="w-full object-contain rounded-md shadow-[0_14px_40px_-11px_rgba(93,96,127,0.2)]" />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
