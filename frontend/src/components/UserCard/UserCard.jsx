import { Link } from "react-router-dom";

function UserCard({ user, isConnection }) {
	return (
		<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-5 flex flex-col items-center transition-all hover:shadow-md hover:-translate-y-0.5">
			<Link to={`/profile/${user.username}`} className="flex flex-col items-center">
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className="w-24 h-24 rounded-full object-cover mb-4 ring-2 ring-white shadow-sm"
				/>
				<h3 className="font-semibold text-lg text-neutral-900 text-center">
					{user.name}
				</h3>
			</Link>

			<p className="text-neutral-600 text-center mt-1">{user.headline}</p>

			<p className="text-sm text-neutral-500 mt-2">
				{user.connections?.length} connections
			</p>

			<button
				className={`mt-4 w-full px-4 py-2 rounded-lg text-white shadow-sm active:scale-[0.97] transition-all ${
					isConnection
						? "bg-green-600 hover:bg-green-700"
						: "bg-blue-600 hover:bg-blue-700"
				}`}
			>
				{isConnection ? "Connected" : "Connect"}
			</button>
		</div>
	);
}

export default UserCard;
