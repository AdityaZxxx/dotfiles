import Image from 'next/image';

export const GreatingSection = () => {
	return (
		<div className="grid z-0 md:grid-cols-2 items-center md:gap-8 gap-6 font-[sans-serif] max-w-5xl max-md:max-w-md mx-auto">
			<div className="max-md:order-1 max-md:text-center">
				<h2 className="md:text-4xl text-3xl md:leading-10 font-extrabold text-primary mb-4">Selamat Datang di Sekolah</h2>
				<p className="mt-4 text-base text-gray-600 leading-relaxed">Embark on a gastronomic journey with our curated dishes, delivered promptly to your doorstep. Elevate your dining experience today.</p>
				<div className="mt-8 flex max-sm:flex-col sm:space-x-4 max-sm:space-y-6">
					<a href="javascript:void(0);" className="px-6 py-3 text-base font-semibold text-white bg-primary rounded-full hover:bg-opacity-80 transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50">
						Explore Our Menu
					</a>
					<a href="javascript:void(0);" className="px-6 py-3 text-base font-semibold text-primary border border-primary rounded-full hover:text-white hover:bg-primary transition-all duration-300 transform hover:scale-105 focus:ring-2 focus:ring-primary focus:outline-none focus:ring-opacity-50">
						Get Started
					</a>
				</div>
			</div>
			<div className="md:h-[450px]">
				<Image width={500} height={500} src="/school.png" className="w-full h-full object-cover rounded-lg shadow-xl" alt="Dining Experience" />
			</div>
		</div>
	);
};
