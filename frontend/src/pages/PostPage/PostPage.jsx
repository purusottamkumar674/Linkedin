import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import Post from "../../components/Post/Post";

const PostPage = () => {
	const { postId } = useParams();
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: post, isLoading } = useQuery({
		queryKey: ["post", postId],
		queryFn: () => axiosInstance.get(`/posts/${postId}`),
	});

	if (isLoading)
		return (
			<div className="min-h-[40vh] grid place-items-center">
				<div className="bg-white rounded-xl border border-neutral-200 shadow-sm px-6 py-4 text-neutral-700">
					Loading post...
				</div>
			</div>
		);

	if (!post?.data)
		return (
			<div className="min-h-[40vh] grid place-items-center">
				<div className="bg-white rounded-xl border border-neutral-200 shadow-sm px-6 py-4 text-neutral-700">
					Post not found
				</div>
			</div>
		);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
			<div className="hidden lg:block lg:col-span-1">
				<Sidebar user={authUser} />
			</div>

			<div className="col-span-1 lg:col-span-3">
				<Post post={post.data} />
			</div>
		</div>
	);
};
export default PostPage;
