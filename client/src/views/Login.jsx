import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import googleIcon from "/src/assets/google-icon.png";
import bgImage from "../assets/login-signup-gradient-background.jpg";
import userLoginImg from "../assets/user-login.svg";
import logo from "../assets/logo.png";
import PasswordInput from "../component/input/PasswordInput.jsx";
import InputField from "../component/input/InputField.jsx";
// import {useform} from "react-hook-form"
import { validateEmail } from "../utils/helper.js";
// 57702251709-sc39d8j5jbe523mvrtg9mttneuhf74e8.apps.googleusercontent.com
const Login = () => {
  const [email, setEmail]= useState ("");
  const [password, setPassword]= useState ("");
  const [error, setError]= useState ("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateEmail(email)){
      setError ("Please enter a valid email address");
      return;
    }
  }
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const submitHandler = (data) => {
    console.log("Login Data:", data);
  };
  return (
    <div className="w-full min-h-screen flex flex-col item-center lg:flex-row overflow-hidden">
      {/* Left side */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
          style={{
            backgroundImage: `url(${bgImage})`,
            transform: "scale(1.02)",
          }}
        />

        {/* Logo Container */}
        <div className="absolute top-5 left-3 z-10">
          <img src={logo} alt="TaskUP Logo" className="w-10 h-auto" />
        </div>
        {/* Image */}
        <div className="relative h-screen flex items-center justify-center p-8">
          <img
            src={userLoginImg}
            alt="Login illustration"
            className="w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 h-auto max-w-2xl object-contain"
          />
        </div>
      </div>

      {/* ///////////////////////////////////////////// */}
      {/* Right side */}

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white-0">
        <div className="w-full max-w-md flex flex-col gap-y-5">
          {/* Title */}
          <div className="flex flex-col gap-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Log in to</h2>
            <h2 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block">
                TaskUP
              </span>
              <span className="text-black">!</span>
            </h2>
          </div>

          {/* Form */}
          <form
            noValidate
            onSubmit={handleSubmit(submitHandler)}
            className="w-full md:w-[400px] flex flex-col gap-y-3"
          >
            <div>
              <InputField
                label="Email"
                type="email"
                className="w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                style={{
                  backgroundColor: "#f7fbff",
                  padding: "5px 9px",
                }}
                value = {email}
                placeholder="example@email.com"
                onChange = {(e) => setEmail (e.target.value)}
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
            
            {/* Password Input */}
            <PasswordInput
            value = {password}
            onChange={(e) => setPassword (e.target.value)}
            error={errors.password}
                rightIcon={
                  showPassword ? (
                    <Eye size={20} className="text-gray-500" />
                  ) : (
                    <EyeOff size={20} className="text-gray-500" />
                  )
                }
                onRightIconClick={togglePasswordVisibility}
            />
            {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}

            {/* Forgot password */}
            <div className="flex items-center justify-end">
              <div className="text-sm">
                <a
                  href="this-is-forgot-password-page!!!"
                  className="text-blue-500 hover:text-blue-900 cursor-pointer"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Log In button */}
            <button
              type="submit"
              className="w-full bg-[#435090] text-white rounded-lg hover:bg-[#353869] focus:outline-none text-sm cursor-pointer"
              style={{
                padding: "10px 5px",
              }}
            >
              Log in
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
              Login with Google
            </button>

            {/* Sign Up link */}
            <p className="text-center text-gray-600 text-sm">
              Don't have an account?{" "}
              <Link to="/signup" className="text-blue-500 hover:text-blue-900">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Login;
