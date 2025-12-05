import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import { useState } from "react";
import { Image, Loader } from "lucide-react";

const PostCreation = ({ user }) => {
    const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);

	const queryClient = useQueryClient();

    const { mutate: createPostMutation, isPending } = useMutation({
		mutationFn: async (postData) => {
			const res = await axiosInstance.post("/posts/create", postData, {
				headers: { "Content-Type": "application/json" },
			});
			return res.data;
		},
		onSuccess: () => {
			resetForm();
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to create post");
		},
	});

    const handlePostCreation = async () => {
		try {
			const postData = { content };
			if (image) postData.image = await readFileAsDataURL(image);

			createPostMutation(postData);
		} catch (error) {
			console.error("Error in handlePostCreation:", error);
		}
	};

    const resetForm = () => {
		setContent("");
		setImage(null);
		setImagePreview(null);
	};

    const handleImageChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
		if (file) {
			readFileAsDataURL(file).then(setImagePreview);
		} else {
			setImagePreview(null);
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

    return (
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md transition-shadow mb-4 p-4">
			<div className="flex space-x-3">
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className="w-12 h-12 rounded-full object-cover ring-1 ring-neutral-200"
				/>
				<textarea
					placeholder="What’s on your mind?"
					className="w-full min-h-[100px] resize-none rounded-xl border border-neutral-300 bg-white/80 backdrop-blur-sm p-3 text-neutral-800 placeholder-neutral-400 shadow-sm hover:bg-white focus:bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-200"
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className="mt-4">
					<img src={imagePreview} alt="Selected" className="w-full h-auto rounded-xl border border-neutral-200 object-cover" />
				</div>
			)}

			<div className="mt-4 flex items-center justify-between">
				<div className="flex space-x-3">
					<label className="inline-flex cursor-pointer items-center rounded-full border border-neutral-200 bg-neutral-50 px-3 py-1.5 text-neutral-700 shadow-sm transition-all hover:bg-neutral-100 active:scale-[0.98]">
						<Image size={18} className="mr-2" />
						<span>Photo</span>
						<input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
					</label>
				</div>

				<button
					className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-sm transition-all hover:bg-blue-700 hover:shadow-md active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
					onClick={handlePostCreation}
					disabled={isPending}
				>
					{isPending ? <Loader className="size-5 animate-spin" /> : "Share"}
				</button>
			</div>
		</div>
    )
}

export default PostCreation
