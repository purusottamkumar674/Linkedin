import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../../lib/axios";
import toast from "react-hot-toast";
import { Loader, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: async (userData) => {
      const res = await axiosInstance.post("/auth/login", userData, {
        withCredentials: true,
      });
      return res.data;
    },
    onSuccess: async (data) => {
      const user = await queryClient.fetchQuery({
        queryKey: ["authUser"],
        queryFn: async () => {
          const res = await axiosInstance.get("/auth/me", { withCredentials: true });
          return res.data ?? null;
        },
      });

      if (user) {
        toast.success(data?.message || "Logged in successfully");
        navigate("/", { replace: true });
      } else {
        toast.error("Login succeeded, but session not detected.");
      }
    },
    onError: (err) => {
      toast.error(err?.response?.data?.message || "Something went wrong");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation({ username, password });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 w-full max-w-md">

      {/* Username */}
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="
          w-full px-4 py-3 rounded-xl border border-neutral-300
          bg-white/80 backdrop-blur-sm shadow-sm
          placeholder-neutral-400 text-neutral-800
          focus:border-blue-600 focus:ring-2 focus:ring-blue-500
          focus:bg-white transition-all duration-200
        "
      />

      {/* Password with Show/Hide Icon */}
      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="
            w-full px-4 py-3 rounded-xl border border-neutral-300
            bg-white/80 backdrop-blur-sm shadow-sm
            placeholder-neutral-400 text-neutral-800
            focus:border-blue-600 focus:ring-2 focus:ring-blue-500
            focus:bg-white transition-all duration-200
          "
        />

        {/* Small Icon (16px) — No design change */}
        <div
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-neutral-500"
        >
          {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="
          w-full py-3 rounded-xl font-semibold text-white bg-blue-600
          hover:bg-blue-700 active:scale-[0.98]
          shadow-md hover:shadow-lg transition-all duration-200
          flex items-center justify-center
        "
      >
        {isPending ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Login"
        )}
      </button>

    </form>
  );
};

export default LoginForm;
