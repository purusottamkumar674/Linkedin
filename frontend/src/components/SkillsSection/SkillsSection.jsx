import { X } from "lucide-react";
import { useState } from "react";

const SkillsSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [skills, setSkills] = useState(userData.skills || []);
	const [newSkill, setNewSkill] = useState("");

	const handleAddSkill = () => {
		if (newSkill && !skills.includes(newSkill)) {
			setSkills([...skills, newSkill]);
			setNewSkill("");
		}
	};

	const handleDeleteSkill = (skill) => {
		setSkills(skills.filter((s) => s !== skill));
	};

	const handleSave = () => {
		onSave({ skills });
		setIsEditing(false);
	};

	return (
		<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
			<h2 className="text-xl font-semibold mb-4 text-neutral-900">Skills</h2>

			<div className="flex flex-wrap">
				{skills.map((skill, index) => (
					<span
						key={index}
						className="mr-2 mb-2 inline-flex items-center rounded-full bg-neutral-100 text-neutral-800 px-3 py-1 text-sm shadow-sm hover:bg-neutral-200 transition-colors"
					>
						{skill}
						{isEditing && (
							<button
								onClick={() => handleDeleteSkill(skill)}
								className="ml-2 inline-flex items-center justify-center rounded-full p-1 text-red-600 hover:bg-red-50 transition-colors"
								aria-label="Remove skill"
								title="Remove"
							>
								<X size={14} />
							</button>
						)}
					</span>
				))}
			</div>

			{isEditing && (
				<div className="mt-4 flex">
					<input
						type="text"
						placeholder="New Skill"
						value={newSkill}
						onChange={(e) => setNewSkill(e.target.value)}
						className="flex-growp-2 rounded-l-full border border-neutral-300 bg-white/90 placeholder-neutral-400 text-neutral-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition"
					/>
					<button
						onClick={handleAddSkill}
						className="rounded-r-full bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md transition-all"
					>
						Add Skill
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className="mt-4 rounded-lg bg-blue-600 text-white py-2 px-4 hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md transition-all"
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className="mt-4 text-blue-600 font-medium hover:text-blue-700 active:scale-[0.98] transition-all"
						>
							Edit Skills
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default SkillsSection;
