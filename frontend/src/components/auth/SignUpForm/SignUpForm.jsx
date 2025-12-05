import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Loader, Eye, EyeOff } from "lucide-react";
import { axiosInstance } from '../../../lib/axios.js';
import toast from "react-hot-toast";

const SignUpForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const queryClient = useQueryClient();

    const { mutate: signUpMutation, isLoading } = useMutation({
        mutationFn: async (data) => {
            const res = await axiosInstance.post("/auth/signup", data);
            return res.data;
        },
        onSuccess: () => {
            toast.success("Account created successfully");
            queryClient.invalidateQueries({ queryKey: ["authUser"] });
        },
        onError: (err) => {
            toast.error(err.response.data.message || "Something went wrong");
        }
    });

    const handleSignUp = (e) => {
        e.preventDefault();
        signUpMutation({ name, email, username, password });
    };

    return (
        <form onSubmit={handleSignUp} className="flex flex-col gap-5 w-full">

            {/* Full Name */}
            <input
                type="text"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="
					w-full px-4 py-3 rounded-xl border border-neutral-300
					bg-white/80 backdrop-blur-sm shadow-sm
					placeholder-neutral-400 text-neutral-800
					focus:border-blue-600 focus:ring-2 focus:ring-blue-500
					focus:bg-white transition-all duration-200
				"
            />

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

            {/* Email */}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="
					w-full px-4 py-3 rounded-xl border border-neutral-300
					bg-white/80 backdrop-blur-sm shadow-sm
					placeholder-neutral-400 text-neutral-800
					focus:border-blue-600 focus:ring-2 focus:ring-blue-500
					focus:bg-white transition-all duration-200
				"
            />

            {/* Password with Show/Hide Icon (same design, no changes) */}
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password (6+ characters)"
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

                {/* Small Icon - No Design Change */}
                <div
                    className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-neutral-500"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </div>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                disabled={isLoading}
                className="
					w-full py-3 rounded-xl font-semibold text-white
					bg-blue-600 hover:bg-blue-700 
					active:scale-[0.98] shadow-md hover:shadow-lg
					transition-all duration-200 flex items-center justify-center
				"
            >
                {isLoading ? (
                    <Loader className="size-5 animate-spin" />
                ) : (
                    "Agree & Join"
                )}
            </button>

        </form>
    );
};

export default SignUpForm;
