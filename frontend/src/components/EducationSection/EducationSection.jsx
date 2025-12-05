import { School, X } from "lucide-react";
import { useState } from "react";

const EducationSection = ({ userData, isOwnProfile, onSave }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [educations, setEducations] = useState(userData.education || []);
	const [newEducation, setNewEducation] = useState({
		school: "",
		fieldOfStudy: "",
		startYear: "",
		endYear: "",
	});

	const handleAddEducation = () => {
		if (newEducation.school && newEducation.fieldOfStudy && newEducation.startYear) {
			setEducations([...educations, newEducation]);
			setNewEducation({
				school: "",
				fieldOfStudy: "",
				startYear: "",
				endYear: "",
			});
		}
	};

	const handleDeleteEducation = (id) => {
		setEducations(educations.filter((edu) => edu._id !== id));
	};

	const handleSave = () => {
		onSave({ education: educations });
		setIsEditing(false);
	};

	return (
		<div className="bg-white rounded-xl shadow-md border border-neutral-200 p-6 mb-6 transition-all">
			<h2 className="text-xl font-semibold mb-4 text-neutral-800">Education</h2>

			{educations.map((edu) => (
				<div
					key={edu._id}
					className="mb-4 flex justify-between items-start rounded-lg p-3 hover:bg-neutral-50 transition"
				>
					<div className="flex items-start">
						<School size={20} className="mr-3 mt-1 text-blue-600" />
						<div>
							<h3 className="font-semibold text-neutral-800">{edu.fieldOfStudy}</h3>
							<p className="text-neutral-600">{edu.school}</p>
							<p className="text-neutral-500 text-sm">
								{edu.startYear} - {edu.endYear || "Present"}
							</p>
						</div>
					</div>

					{isEditing && (
						<button
							onClick={() => handleDeleteEducation(edu._id)}
							className="text-red-600 hover:text-red-700 p-1 rounded-md hover:bg-red-50 transition"
							aria-label="Delete education"
							title="Delete"
						>
							<X size={20} />
						</button>
					)}
				</div>
			))}

			{isEditing && (
				<div className="mt-4">
					<input
						type="text"
						placeholder="School"
						value={newEducation.school}
						onChange={(e) => setNewEducation({ ...newEducation, school: e.target.value })}
						className="w-full p-3 border border-neutral-300 rounded-lg mb-2 bg-white/90 shadow-sm placeholder-neutral-400 text-neutral-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition"
					/>
					<input
						type="text"
						placeholder="Field of Study"
						value={newEducation.fieldOfStudy}
						onChange={(e) => setNewEducation({ ...newEducation, fieldOfStudy: e.target.value })}
						className="w-full p-3 border border-neutral-300 rounded-lg mb-2 bg-white/90 shadow-sm placeholder-neutral-400 text-neutral-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition"
					/>
					<input
						type="number"
						placeholder="Start Year"
						value={newEducation.startYear}
						onChange={(e) => setNewEducation({ ...newEducation, startYear: e.target.value })}
						className="w-full p-3 border border-neutral-300 rounded-lg mb-2 bg-white/90 shadow-sm placeholder-neutral-400 text-neutral-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition"
					/>
					<input
						type="number"
						placeholder="End Year"
						value={newEducation.endYear}
						onChange={(e) => setNewEducation({ ...newEducation, endYear: e.target.value })}
						className="w-full p-3 border border-neutral-300 rounded-lg mb-3 bg-white/90 shadow-sm placeholder-neutral-400 text-neutral-800 focus:border-blue-600 focus:ring-2 focus:ring-blue-500 transition"
					/>
					<button
						onClick={handleAddEducation}
						className="bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md transition"
					>
						Add Education
					</button>
				</div>
			)}

			{isOwnProfile && (
				<>
					{isEditing ? (
						<button
							onClick={handleSave}
							className="mt-4 bg-blue-600 text-white py-2 px-5 rounded-lg hover:bg-blue-700 active:scale-[0.98] shadow-sm hover:shadow-md transition"
						>
							Save Changes
						</button>
					) : (
						<button
							onClick={() => setIsEditing(true)}
							className="mt-4 text-blue-600 font-medium hover:text-blue-700 active:scale-[0.98] transition"
						>
							Edit Education
						</button>
					)}
				</>
			)}
		</div>
	);
};
export default EducationSection;
