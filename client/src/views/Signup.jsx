import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import InputField from "../component/InputField.jsx";

import bgImage from "../assets/login-signup-gradient-background.jpg";
import logo from "../assets/logo.png";
import userSignup from "../assets/user-signup.svg";
import googleIcon from "/src/assets/google-icon.png";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const password = watch("password");

  const submitHandler = (data) => {
    console.log("Signup Data:", data);
    /////////////////////////
  };

  return (
    <div className="w-full min-h-screen flex flex-col item-center lg:flex-row overflow-hidden">
      {/* Left side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md flex flex-col gap-y-5">
          {/* Title */}
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Sign Up for</h2>
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block">
                TaskUP
              </span>
              <span className="text-black">!</span>
            </h2>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit(submitHandler)}
            className="w-full md:w-[400px] flex flex-col gap-y-2"
          >
            {/* Username input */}
            <div>
              <InputField
                label="Username"
                type="text"
                placeholder="examplename"
                register={register("username", {
                  required: "Username is required.",
                })}
                error={errors.username}
              />
              {errors.username && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* Email input */}
            <div>
              <InputField
                label="Email"
                type="email"
                placeholder="example@email.com"
                register={register("email", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Invalid email address.",
                  },
                })}
                error={errors.email}
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password input */}
            <div>
              <InputField
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••••"
                register={register("password", {
                  required: "Password is required.",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters.",
                  },
                })}
                error={errors.password}
                rightIcon={
                  showPassword ? (
                    <Eye size={20} className="text-gray-500" />
                  ) : (
                    <EyeOff size={20} className="text-gray-500" />
                  )
                }
                onRightIconClick={() => setShowPassword(!showPassword)}
              />
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password input */}
            <div>
              <InputField
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••••"
                register={register("confirmPassword", {
                  required: "Please confirm your password.",
                  validate: (value) =>
                    value === password || "Your password does not match.",
                })}
                error={errors.confirmPassword}
                rightIcon={
                  showConfirmPassword ? (
                    <Eye size={20} className="text-gray-500" />
                  ) : (
                    <EyeOff size={20} className="text-gray-500" />
                  )
                }
                onRightIconClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Spacer div - just for spacing, not important element! */}
            <div className="h-1"></div>

            {/* Sign Up button */}
            <button
              type="submit"
              className="w-full bg-[#435090] text-white rounded-lg hover:bg-[#353869] focus:outline-none text-sm cursor-pointer"
              style={{
                padding: "10px 5px",
              }}
            >
              Sign up
            </button>

            {/* OR divider */}
            <div className="relative flex items-center justify-center">
              <div className="absolute border-t border-gray-300 w-full"></div>
              <span className="relative bg-white px-8 text-sm text-gray-500">
                OR
              </span>
            </div>

            {/* Google Login button */}
            <button
              type="button"
              className="w-full flex items-center justify-center gap-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none text-sm cursor-pointer"
              style={{
                padding: "10px 5px",
              }}
            >
              <img src={googleIcon} alt="Google icon" className="w-5 h-5" />
              Sign up with Google
            </button>
            
            {/* Sign Up link */}
            <p className="text-center text-gray-600 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-900">
                Log in
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* ///////////////////////////////////////////// */}
      {/* Right side */}

      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: "scale(1.02)",
          }}
        />
        {/* Logo */}
        <div className="absolute top-8 left-8 z-10">
          <img src={logo} alt="TaskUP Logo" className="w-10 h-auto" />
        </div>
        <div className="relative h-screen flex items-center justify-center p-8">
          <img
            src={userSignup}
            alt="Signup illustration"
            className="w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 h-auto max-w-2xl object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
