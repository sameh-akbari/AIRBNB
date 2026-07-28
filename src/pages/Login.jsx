import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks";
import { loginSchema } from "@/validations/auth.validation";
import { getApiErrorMessage } from "@/utils";

function Login() {
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const successMessage = location.state?.message;
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async ({ email, password }) => {
    setSubmitError("");
    try {
      const result = await login(email, password);
      if (result.success) {
        navigate("/", { replace: true });
      } else {
        setSubmitError(
          result.message || "Login failed. Check email and password.",
        );
      }
    } catch (err) {
      setSubmitError(getApiErrorMessage(err, "Login failed. Try again."));
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="flex justify-center">
          <Link to="/" className="flex items-center space-x-2">
            <svg
              className="w-8 h-8 text-[#FF385C]"
              fill="currentColor"
              viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
            </svg>
            <span className="text-2xl font-bold text-[#FF385C]">airbnb</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-900">
              Welcome back
            </h2>
            <p className="mt-2 text-sm text-gray-600">Log in to your account</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {successMessage && (
              <p className="text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                {successMessage}
              </p>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition-colors`}
                placeholder="Email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                autoComplete="current-password"
                {...register("password")}
                className={`appearance-none relative block w-full px-4 py-3 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF385C] focus:border-transparent transition-colors`}
                placeholder="Password"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
                {submitError}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-[#FF385C] hover:bg-[#E61E4D] transition-colors disabled:opacity-70 disabled:cursor-not-allowed">
              {isSubmitting ? "Logging in…" : "Log in"}
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="text-sm text-[#FF385C] hover:text-[#E61E4D] font-medium">
                Don&apos;t have an account? Sign up
              </Link>
            </div>
          </div>
        </div>

        <div className="text-center text-sm text-gray-600">
          <p>
            By continuing, you agree to Airbnb&apos;s{" "}
            <a href="#" className="text-[#FF385C] hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-[#FF385C] hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;
