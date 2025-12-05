// src/pages/HomePage/HomePage.jsx
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import Sidebar from "../../components/Sidebar/Sidebar";
import PostCreation from "../../components/PostCreation/PostCreation";
import Post from "../../components/Post/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../../components/RecommendedUser/RecommendedUser";

const HomePage = () => {
  // ✅ Provide a queryFn for authUser
  const {
    data: authUser,
    isLoading: authLoading,
    isError: authError,
  } = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me", { withCredentials: true });
      // your /auth/me returns req.user directly
      return res.data ?? null;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1000,
  });

  const {
    data: recommendedUsers = [],
    isLoading: recLoading,
    isError: recError,
  } = useQuery({
    queryKey: ["recommendedUsers"],
    queryFn: async () => {
      const res = await axiosInstance.get("/users/suggestions", { withCredentials: true });
      return Array.isArray(res.data) ? res.data : [];
    },
    retry: false,
  });

  const {
    data: posts = [],
    isLoading: postsLoading,
    isError: postsError,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts", { withCredentials: true });
      return Array.isArray(res.data) ? res.data : [];
    },
    retry: false,
  });

  // (optional) show nothing until auth resolves to avoid flicker/guards
  // if (authLoading) return null;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      {/* Left: Sidebar */}
      <div className="hidden lg:block lg:col-span-1">
        <Sidebar user={authUser} loading={authLoading} error={authError} />
      </div>

      {/* Middle: Feed */}
      <div className="col-span-1 lg:col-span-2 order-first lg:order-none">
        <div className="mb-4 lg:mb-6">
          <PostCreation user={authUser} loading={authLoading} />
        </div>

        {/* Posts list */}
        {!postsLoading && !postsError && posts.map((post) => (
          <div key={post._id} className="transition-transform">
            <Post post={post} />
          </div>
        ))}

        {/* Empty feed */}
        {!postsLoading && !postsError && posts.length === 0 && (
          <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-blue-600" />
            </div>
            <h2 className="text-2xl font-bold mb-2 text-neutral-900">No Posts Yet</h2>
            <p className="text-neutral-600">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {/* Right: Recommendations */}
      <div className="col-span-1 lg:col-span-1 hidden lg:block">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-4">
          <h2 className="font-semibold mb-4 text-neutral-900">People you may know</h2>

          {recError && <div className="text-red-600">Failed to load suggestions.</div>}

          {!recError && !recLoading && recommendedUsers.length === 0 && (
            <div className="text-neutral-600">No suggestions right now.</div>
          )}

          {!recError && recommendedUsers.map((user) => (
            <RecommendedUser key={user._id} user={user} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
