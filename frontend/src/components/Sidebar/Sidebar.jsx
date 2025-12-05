import { Link } from "react-router-dom";
import { Home, UserPlus, Bell } from "lucide-react";

export default function Sidebar({ user }) {
	return (
		<div className="bg-white rounded-xl shadow-lg border border-neutral-200 overflow-hidden">
			
			{/* Banner + Profile */}
			<div className="p-4 text-center">
				<div
					className="h-20 w-full rounded-t-lg bg-cover bg-center"
					style={{
						backgroundImage: `url("${user.bannerImg || "/banner.png"}")`,
					}}
				/>

				<Link to={`/profile/${user.username}`}>
					<img
						src={user.profilePicture || "/avatar.png"}
						alt={user.name}
						className="w-20 h-20 rounded-full mx-auto mt-[-40px] ring-4 ring-white shadow-md object-cover"
					/>
					<h2 className="text-lg font-semibold mt-2 text-neutral-800">
						{user.name}
					</h2>
				</Link>

				<p className="text-neutral-500 text-sm">{user.headline}</p>
				<p className="text-neutral-500 text-xs">
					{user.connections.length} connections
				</p>
			</div>

			{/* Navigation */}
			<div className="border-t border-neutral-200 p-4">
				<nav>
					<ul className="space-y-2">

						<li>
							<Link
								to="/"
								className="
									flex items-center py-2 px-4 rounded-lg 
									text-neutral-700 hover:text-white
									hover:bg-blue-600
									transition-all duration-200
									active:scale-[0.98]
								"
							>
								<Home className="mr-2" size={20} /> Home
							</Link>
						</li>

						<li>
							<Link
								to="/network"
								className="
									flex items-center py-2 px-4 rounded-lg 
									text-neutral-700 hover:text-white
									hover:bg-blue-600
									transition-all duration-200
									active:scale-[0.98]
								"
							>
								<UserPlus className="mr-2" size={20} /> My Network
							</Link>
						</li>

						<li>
							<Link
								to="/notifications"
								className="
									flex items-center py-2 px-4 rounded-lg 
									text-neutral-700 hover:text-white
									hover:bg-blue-600
									transition-all duration-200
									active:scale-[0.98]
								"
							>
								<Bell className="mr-2" size={20} /> Notifications
							</Link>
						</li>

					</ul>
				</nav>
			</div>

			{/* Profile Link */}
			<div className="border-t border-neutral-200 p-4">
				<Link
					to={`/profile/${user.username}`}
					className="
						text-sm font-semibold text-blue-600
						hover:text-blue-700 transition 
					"
				>
					Visit your profile
				</Link>
			</div>
		</div>
	);
}
