import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
	const queryClient = useQueryClient();

	const { data: connectionStatus, isLoading } = useQuery({
		queryKey: ["connectionStatus", user._id],
		queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
	});

	const { mutate: sendConnectionRequest } = useMutation({
		mutationFn: (userId) => axiosInstance.post(`/connections/request/${userId}`),
		onSuccess: () => {
			toast.success("Connection request sent successfully");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: acceptRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const { mutate: rejectRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionStatus", user._id] });
		},
		onError: (error) => {
			toast.error(error.response?.data?.error || "An error occurred");
		},
	});

	const renderButton = () => {
		if (isLoading) {
			return (
				<button className="px-3 py-1 rounded-full text-sm bg-neutral-100 text-neutral-500 cursor-not-allowed">
					Loading...
				</button>
			);
		}

		switch (connectionStatus?.data?.status) {
			case "pending":
				return (
					<button
						className="px-3 py-1 rounded-full text-sm bg-amber-500 text-white flex items-center shadow-sm"
						disabled
					>
						<Clock size={16} className="mr-1" />
						Pending
					</button>
				);
			case "received":
				return (
					<div className="flex gap-2 justify-center">
						<button
							onClick={() => acceptRequest(connectionStatus.data.requestId)}
							className="rounded-full p-1 flex items-center justify-center bg-green-600 text-white shadow-sm hover:bg-green-700 active:scale-[0.98] transition-all"
						>
							<Check size={16} />
						</button>
						<button
							onClick={() => rejectRequest(connectionStatus.data.requestId)}
							className="rounded-full p-1 flex items-center justify-center bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98] transition-all"
						>
							<X size={16} />
						</button>
					</div>
				);
			case "connected":
				return (
					<button
						className="px-3 py-1 rounded-full text-sm bg-green-600 text-white flex items-center shadow-sm"
						disabled
					>
						<UserCheck size={16} className="mr-1" />
						Connected
					</button>
				);
			default:
				return (
					<button
						className="px-3 py-1 rounded-full text-sm border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition-all duration-200 flex items-center shadow-sm active:scale-[0.98]"
						onClick={handleConnect}
					>
						<UserPlus size={16} className="mr-1" />
						Connect
					</button>
				);
		}
	};

	const handleConnect = () => {
		if (connectionStatus?.data?.status === "not_connected") {
			sendConnectionRequest(user._id);
		}
	};

	return (
		<div className="flex items-center justify-between mb-4 rounded-xl border border-neutral-200 bg-white p-3 shadow-sm hover:shadow-md transition-shadow">
			<Link to={`/profile/${user.username}`} className="flex items-center flex-grow">
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className="w-12 h-12 rounded-full mr-3 object-cover ring-1 ring-neutral-200"
				/>
				<div>
					<h3 className="font-semibold text-sm text-neutral-900">{user.name}</h3>
					<p className="text-xs text-neutral-500">{user.headline}</p>
				</div>
			</Link>
			{renderButton()}
		</div>
	);
};
export default RecommendedUser;
