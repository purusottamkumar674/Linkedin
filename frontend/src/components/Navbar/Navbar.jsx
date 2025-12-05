import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import { Link, useNavigate } from "react-router-dom"; // 🔹 ADDED useNavigate
import { Bell, Home, LogOut, User, Users } from "lucide-react";

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate(); // 🔹 ADDED

  // ---- /auth/me first, then others
  const meQuery = useQuery({
    queryKey: ["authUser"],
    queryFn: async () => {
      const res = await axiosInstance.get("/auth/me");
      return res.data?.user ?? null;
    },
    retry: false,
    staleTime: 0,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });

  const authUser = meQuery.data;

  const notificationsQuery = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications");
      return Array.isArray(res.data) ? res.data : res.data?.notifications ?? [];
    },
    enabled: meQuery.isSuccess && !!meQuery.data,
    retry: false,
  });

  const requestsQuery = useQuery({
    queryKey: ["connectionRequests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/connections/requests");
      return Array.isArray(res.data) ? res.data : res.data?.requests ?? [];
    },
    enabled: meQuery.isSuccess && !!meQuery.data,
    retry: false,
  });

  const notifications = notificationsQuery.data ?? [];
  const connectionRequests = requestsQuery.data ?? [];

  // ---- Logout
  const { mutate: logout, isPending: isLoggingOut } = useMutation({
    mutationFn: () => axiosInstance.post("/auth/logout"),
    onSuccess: () => {
      // clear caches so UI reset ho jaye
      queryClient.removeQueries({ queryKey: ["notifications"] });
      queryClient.removeQueries({ queryKey: ["connectionRequests"] });
      queryClient.invalidateQueries({ queryKey: ["authUser"] });

      // (optional) clear any local token if you use one
      // localStorage.removeItem("token");

      // 🔹 Redirect to login immediately on first successful click
      navigate("/login", { replace: true });
    },
  });

  const unreadNotificationCount = notifications.filter((n) => !n?.read).length;
  const unreadConnectionRequestsCount = connectionRequests.length;

  return (
    <nav className="sticky top-0 z-50 bg-white/100 backdrop-blur-md border-b border-neutral-200 shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 items-center justify-between">
          {/* Left: Logo */}
          <div className="flex items-center gap-3">
            <Link to="/" className="inline-flex items-center gap-2">
              <img
                className="h-8 w-8 rounded-lg object-cover ring-1 ring-neutral-200"
                src="/small-logo.png"
                alt="Logo"
              />
            </Link>
          </div>

          {/* Right: Nav */}
          <div className="flex items-center gap-2">
            {meQuery.isLoading ? (
              <div className="h-6 w-24 animate-pulse rounded bg-neutral-200" />
            ) : authUser ? (
              <div className="flex items-center gap-1 md:gap-3">
                {/* Home */}
                <Link
                  to="/"
                  className="group relative flex flex-col items-center rounded-xl p-2 text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-100/70 hover:text-neutral-900 active:scale-95"
                >
                  <Home size={22} />
                  <span className="mt-0.5 hidden text-xs md:block">Home</span>
                </Link>

                {/* Network */}
                <Link
                  to="/network"
                  className="group relative flex flex-col items-center rounded-xl p-2 text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-100/70 hover:text-neutral-900 active:scale-95"
                >
                  <div className="relative">
                    <Users size={22} />
                    {unreadConnectionRequestsCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                        {unreadConnectionRequestsCount > 9 ? "9+" : unreadConnectionRequestsCount}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 hidden text-xs md:block">Network</span>
                </Link>

                {/* Notifications */}
                <Link
                  to="/notifications"
                  className="group relative flex flex-col items-center rounded-xl p-2 text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-100/70 hover:text-neutral-900 active:scale-95"
                >
                  <div className="relative">
                    <Bell size={22} />
                    {unreadNotificationCount > 0 && (
                      <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white ring-2 ring-white">
                        {unreadNotificationCount > 9 ? "9+" : unreadNotificationCount}
                      </span>
                    )}
                  </div>
                  <span className="mt-0.5 hidden text-xs md:block">Notifications</span>
                </Link>

                {/* Me */}
                <Link
                  to={`/profile/${authUser.username}`}
                  className="group relative flex flex-col items-center rounded-xl p-2 text-neutral-600 transition hover:-translate-y-0.5 hover:bg-neutral-100/70 hover:text-neutral-900 active:scale-95"
                >
                  <User size={22} />
                  <span className="mt-0.5 hidden text-xs md:block">Me</span>
                </Link>

                {/* Logout */}
                <button
                  className="ml-2 group relative flex flex-col items-center rounded-xl p-2 text-neutral-600 transition hover:-translate-y-0.5 hover:bg-red-50 hover:text-red-600 active:scale-95"
                  onClick={() => logout()}
                  title="Logout"
                  disabled={isLoggingOut} // 🔹 prevents multiple clicks while processing
                >
                  <LogOut size={22} />
                  <span className="mt-0.5 hidden text-xs md:block">Logout</span>
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="rounded-md px-3 py-1.5 font-semibold text-blue-600 transition hover:bg-blue-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="rounded-full border-2 border-blue-600 bg-blue-600 px-3 py-1.5 font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-95"
                >
                  Join now
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
