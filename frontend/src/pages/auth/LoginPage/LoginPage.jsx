import { Link } from "react-router-dom"
import LoginForm from "../../../components/auth/LoginForm/LoginForm"

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-950 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-16 w-auto drop-shadow-sm"
          src="/public/logo (1).svg"
          alt="LinkedIn"
        />
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-slate-900/70 backdrop-blur supports-[backdrop-filter]:bg-white/90 px-6 py-8 sm:px-10 shadow-lg rounded-2xl border border-slate-200/70 dark:border-slate-800 ring-1 ring-slate-900/5 transition-all duration-300 hover:shadow-xl">
          <LoginForm />

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200 dark:border-slate-800"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="px-3 bg-white dark:bg-slate-900/70 text-sm text-slate-500">
                  New to LinkedIn?
                </span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                to="/signup"
                className="w-full inline-flex items-center justify-center rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm font-semibold text-blue-700 dark:text-blue-400 shadow-sm hover:bg-slate-50 dark:hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-900 transition"
              >
                Join now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
