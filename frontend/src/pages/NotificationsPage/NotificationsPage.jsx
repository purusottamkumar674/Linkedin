import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import { ExternalLink, Eye, MessageSquare, ThumbsUp, Trash2, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";

const NotificationsPage = () => {
  // assumes someone else populated ["authUser"]; otherwise pass a queryFn here too
  const { data: authUser } = useQuery({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { data: notifications = [], isLoading, isError, error } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      const res = await axiosInstance.get("/notifications");
      const body = res.data;
      if (Array.isArray(body)) return body;
      if (Array.isArray(body?.notifications)) return body.notifications;
      return [];
    },
    staleTime: 0,
    retry: 1,
  });

  const { mutate: markAsReadMutation, isPending: marking } = useMutation({
    mutationFn: (id) => axiosInstance.put(`/notifications/${id}/read`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Failed to mark as read");
    },
  });

  const { mutate: deleteNotificationMutation, isPending: deleting } = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/notifications/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification deleted");
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Delete failed");
    },
  });

  const renderNotificationIcon = (type) => {
    switch (type) {
      case "like":
        return <ThumbsUp className="text-blue-600" />;
      case "comment":
        return <MessageSquare className="text-green-600" />;
      case "connectionAccepted":
        return <UserPlus className="text-purple-600" />;
      default:
        return null;
    }
  };

  const renderNotificationContent = (n) => {
    const u = n?.relatedUser;
    switch (n?.type) {
      case "like":
        return (
          <span>
            <strong>{u?.name || "Someone"}</strong> liked your post
          </span>
        );
      case "comment":
        return (
          <span>
            <Link to={`/profile/${u?.username || ""}`} className="font-bold">
              {u?.name || "Someone"}
            </Link>{" "}
            commented on your post
          </span>
        );
      case "connectionAccepted":
        return (
          <span>
            <Link to={`/profile/${u?.username || ""}`} className="font-bold">
              {u?.name || "Someone"}
            </Link>{" "}
            accepted your connection request
          </span>
        );
      default:
        return <span>Notification</span>;
    }
  };

  const renderRelatedPost = (p) => {
    if (!p?._id) return null;
    return (
      <Link
        to={`/post/${p._id}`}
        className="mt-2 p-2 rounded-lg border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors flex items-center gap-2"
      >
        {p.image && (
          <img src={p.image} alt="Post preview" className="w-10 h-10 object-cover rounded" />
        )}
        <div className="flex-1 overflow-hidden">
          <p className="text-sm text-neutral-600 truncate">{p.content}</p>
        </div>
        <ExternalLink size={14} className="text-neutral-400" />
      </Link>
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
      <div className="col-span-1 lg:col-span-1">
        <Sidebar user={authUser} />
      </div>

      <div className="col-span-1 lg:col-span-3">
        <div className="bg-white rounded-xl border border-neutral-200 shadow-sm p-6">
          <h1 className="text-2xl font-bold mb-6 text-neutral-900">Notifications</h1>

          {isLoading && <p className="text-neutral-600">Loading notifications...</p>}
          {isError && <p className="text-red-600">Error: {error?.message || "Failed to load"}</p>}

          {!isLoading && !isError && notifications.length > 0 ? (
            <ul>
              {notifications.map((n) => (
                <li
                  key={n._id}
                  className={`rounded-xl border p-4 my-4 transition-shadow hover:shadow-md ${
                    !n.read ? "border-blue-200 bg-blue-50" : "border-neutral-200 bg-white"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <Link to={`/profile/${n?.relatedUser?.username || ""}`}>
                        <img
                          src={n?.relatedUser?.profilePicture || "/avatar.png"}
                          alt={n?.relatedUser?.name || "User"}
                          className="w-12 h-12 rounded-full object-cover ring-1 ring-white shadow-sm"
                        />
                      </Link>

                      <div>
                        <div className="flex items-center gap-2">
                          <div className="p-1.5 bg-neutral-100 rounded-full ring-1 ring-neutral-200">
                            {renderNotificationIcon(n?.type)}
                          </div>
                          <p className="text-sm text-neutral-800">{renderNotificationContent(n)}</p>
                        </div>

                        <p className="text-xs text-neutral-500 mt-1">
                          {n?.createdAt
                            ? formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })
                            : ""}
                        </p>

                        {renderRelatedPost(n?.relatedPost)}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {!n.read && (
                        <button
                          onClick={() => markAsReadMutation(n._id)}
                          disabled={marking}
                          className="p-2 rounded-md bg-blue-100 text-blue-700 hover:bg-blue-200 active:scale-[0.98] transition-all disabled:opacity-60"
                          aria-label="Mark as read"
                          title="Mark as read"
                        >
                          <Eye size={16} />
                        </button>
                      )}

                      <button
                        onClick={() => deleteNotificationMutation(n._id)}
                        disabled={deleting}
                        className="p-2 rounded-md bg-red-100 text-red-700 hover:bg-red-200 active:scale-[0.98] transition-all disabled:opacity-60"
                        aria-label="Delete notification"
                        title="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            !isLoading &&
            !isError && (
              <p className="text-neutral-600">No notification at the moment.</p>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
