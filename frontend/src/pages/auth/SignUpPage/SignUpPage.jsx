import { Link } from "react-router-dom";
import SignUpForm from "../../../components/auth/SignUpForm/SignUpForm";

const SignUpPage = () => {
	return (
		<div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
			<div className="sm:mx-auto sm:w-full sm:max-w-md">
				<img
					className="mx-auto h-20 w-auto drop-shadow-sm"
					src="/public/logo (1).svg"
					alt="LinkedIn"
				/>
				<h2 className="mt-4 text-center text-3xl font-bold text-neutral-900 tracking-tight">
					Make the most of your professional life
				</h2>
			</div>

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
				<div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-neutral-200">
					{/* Form */}
					<SignUpForm />

					{/* Divider */}
					<div className="mt-8">
						<div className="relative">
							<div className="absolute inset-0 flex items-center">
								<div className="w-full border-t border-neutral-300"></div>
							</div>
							<div className="relative flex justify-center text-sm">
								<span className="px-2 bg-white text-neutral-500">
									Already on LinkedIn?
								</span>
							</div>
						</div>

						{/* Sign in link */}
						<div className="mt-6">
							<Link
								to="/login"
								className="w-full flex justify-center py-2 px-4 rounded-lg border border-blue-600 text-blue-600 bg-white hover:bg-blue-50 hover:text-blue-700 transition-all shadow-sm"
							>
								Sign in
							</Link>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SignUpPage;
