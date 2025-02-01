export const Faq = () => {
	return (
		<div className="p-4 font-sans">
			<div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md">
				<div className="p-6 border-b">
					<h2 className="text-3xl font-extrabold text-indigo-800">Frequently Asked Questions</h2>
					<p className="text-gray-600 mt-4 text-sm">Explore our comprehensive FAQ to find answers to common queries.</p>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
					<div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
						<h3 className="text-lg font-semibold text-indigo-700 mb-2">How can I create an account?</h3>
						<p className="text-gray-600 text-sm">Creating an account is easy! Click on the &quot;Sign Up&quot; button and follow the simple steps to get started.</p>
					</div>
					<div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
						<h3 className="text-lg font-semibold text-indigo-700 mb-2">Is there a mobile app available?</h3>
						<p className="text-gray-600 text-sm">Yes, we offer a mobile app for both iOS and Android. Visit the App Store or Google Play to download it.</p>
					</div>
					<div className="bg-indigo-50 p-6 rounded-lg border border-indigo-200">
						<h3 className="text-lg font-semibold text-indigo-700 mb-2">How can I reset my password?</h3>
						<p className="text-gray-600 text-sm">To reset your password, go to the login page and click on the &quot;Forgot Password&quot; link. Follow the instructions sent to your email.</p>
					</div>
				</div>
			</div>
		</div>
	);
};
