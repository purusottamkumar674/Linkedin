import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";

const FriendRequest = ({ request }) => {
	const queryClient = useQueryClient();

	const { mutate: acceptConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/accept/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request accepted");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
			queryClient.invalidateQueries({ queryKey: ["connections"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	const { mutate: rejectConnectionRequest } = useMutation({
		mutationFn: (requestId) => axiosInstance.put(`/connections/reject/${requestId}`),
		onSuccess: () => {
			toast.success("Connection request rejected");
			queryClient.invalidateQueries({ queryKey: ["connectionRequests"] });
            queryClient.invalidateQueries({ queryKey: ["connections"] });
		},
		onError: (error) => {
			toast.error(error.response.data.error);
		},
	});

	return (
		<div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4 flex items-center justify-between transition-all hover:shadow-md hover:-translate-y-0.5">
			<div className="flex items-center gap-4">
				<Link to={`/profile/${request.sender.username}`}>
					<img
						src={request.sender.profilePicture || "/avatar.png"}
						alt={request.name}
						className="w-16 h-16 rounded-full object-cover ring-2 ring-white shadow-sm"
					/>
				</Link>

				<div>
					<Link
						to={`/profile/${request.sender.username}`}
						className="font-semibold text-lg text-neutral-800 hover:text-neutral-900 transition-colors"
					>
						{request.sender.name}
					</Link>
					<p className="text-neutral-600">{request.sender.headline}</p>
				</div>
			</div>

			<div className="space-x-2">
				<button
					className="px-4 py-2 rounded-lg bg-blue-600 text-white font-medium shadow-sm hover:bg-blue-700 hover:shadow-md active:scale-[0.98] transition-all"
					onClick={() => acceptConnectionRequest(request._id)}
				>
					Accept
				</button>
				<button
					className="px-4 py-2 rounded-lg bg-neutral-100 text-neutral-800 font-medium shadow-sm hover:bg-neutral-200 hover:shadow-md active:scale-[0.98] transition-all"
					onClick={() => rejectConnectionRequest(request._id)}
				>
					Reject
				</button>
			</div>
		</div>
	);
};
export default FriendRequest;
