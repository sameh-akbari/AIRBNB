import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/validations/auth.validation";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useState } from "react";
function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { register: signUp } = useAuth();
  const [submitError, setSubmitError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (formData) => {
    setSubmitError("");
    const result = await signUp({
      first_name: formData.firstName.trim(),
      last_name: formData.lastName.trim(),
      email: formData.email.trim(),
      password: formData.password,
    });

    if (result.success) {
      if (result.requireLogin) {
        navigate("/login", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } else {
      setSubmitError(result.message || "Register Failed");
    }
  };

  return (
    <>
      <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center">
            <a href="index.html" className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-[#FF385C]"
                fill="currentColor"
                viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
              </svg>
              <span className="text-2xl font-bold text-[#FF385C]">airbnb</span>
            </a>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-semibold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Sign up to start exploring
              </p>
            </div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              action="login.html">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First name
                  </label>
                  <input
                    id="firstName"
                    {...register("firstName")}
                    type="text"
                    required
                    placeholder="First name"
                    className="input-form"
                  />
                  {errors.firstName && (
                    <p className="text-red-600 text-sm my-2">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    {...register("lastName")}
                    type="text"
                    required
                    placeholder="Last name"
                    className="input-form"
                  />
                  {errors.lastName && (
                    <p className="text-red-600 text-sm my-2">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  type="email"
                  required
                  placeholder="Email"
                  className="input-form"
                />
                {errors.email && (
                  <p className="text-red-600 text-sm my-2">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  {...register("password")}
                  type="password"
                  required
                  minlength="6"
                  placeholder="Password (min. 6 characters)"
                  className="input-form"
                />
                {errors.password && (
                  <p className="text-red-600 text-sm my-2">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ConfirmPassword
                </label>
                <input
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  type="password"
                  required
                  minlength="6"
                  placeholder="confirmPassword"
                  className="input-form"
                />
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm my-2">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {submitError && (
                <p className="text-red-600 text-sm my-2">{submitError}</p>
              )}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-form">
                {isSubmitting ? "creating account ...." : "Sign up"}
              </button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">or</span>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Link
                  href="/login"
                  className="text-sm text-[#FF385C] hover:text-[#E61E4D] font-medium">
                  Already have an account? Log in
                </Link>
              </div>
            </div>
          </div>
          <div className="text-center text-sm text-gray-600">
            <p>
              By continuing, you agree to Airbnb's{" "}
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
    </>
  );
}

export default Register;
