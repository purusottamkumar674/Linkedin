import { useState } from "react";

const AboutSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [about, setAbout] = useState(userData.about || "");

	const handleSave = () => {
		setIsEditing(false);
		onSave({ about });
	};

	return (
		<div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 mb-6 transition-all">
			<h2 className="text-xl font-semibold mb-4 text-neutral-800">About</h2>

			{isOwnProfile && (
				<>
					{isEditing ? (
						<>
							<textarea
								value={about}
								onChange={(e) => setAbout(e.target.value)}
								className="
									w-full p-3 border border-neutral-300 rounded-lg 
									focus:ring-2 focus:ring-blue-500 focus:border-blue-500
									text-neutral-700 bg-white shadow-sm transition
								"
								rows="4"
							/>

							<button
								onClick={handleSave}
								className="
									mt-3 bg-blue-600 text-white py-2 px-5 rounded-lg 
									hover:bg-blue-700 active:scale-[0.98]
									transition-all duration-200 shadow-sm
								"
							>
								Save
							</button>
						</>
					) : (
						<>
							<p className="text-neutral-700 leading-relaxed">
								{userData.about}
							</p>

							<button
								onClick={() => setIsEditing(true)}
								className="
									mt-3 text-blue-600 font-medium 
									hover:text-blue-700 active:scale-[0.97]
									transition-all duration-200
								"
							>
								Edit
							</button>
						</>
					)}
				</>
			)}

			{!isOwnProfile && (
				<p className="text-neutral-700 leading-relaxed">{userData.about}</p>
			)}
		</div>
	);
};

export default AboutSection;
