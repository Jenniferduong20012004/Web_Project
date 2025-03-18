import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

import { Eye, EyeOff } from "lucide-react";
import googleIcon from "/src/assets/google-icon.png";
import bgImage from "../assets/login-signup-gradient-background.jpg";
import userLoginImg from "../assets/user-login.svg";
import logo from "../assets/logo.png";
import InputField from "../component/input/InputField.jsx";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const submitHandler = async (data) => {
    setIsLoading(true);
    const loadingToast = toast.loading("Logging in...", {
      position: "top-right",
      pauseOnHover: false,
      closeOnClick: false,
      autoClose: false,
    });

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email: data.email,
        password: data.password,
      });

      if (response.data.success) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.success("Login successful!", { 
          position: "top-right",
          autoClose: 2000
        });
        
        setTimeout(() => {
          setIsLoading(false);
          navigate("/homepage");
        }, 2000);

      } else {
        toast.error(response.data.message || "Login failed", {
          position: "top-right",
        });
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response.data.message || "Invalid login credentials",
          {
            position: "top-right",
          }
        );
      } else if (error.request) {
        toast.error("Unable to connect to server. Please try again later.", {
          position: "top-right",
        });
      } else {
        toast.error("Error during login: " + error.message, {
          position: "top-right",
        });
      }
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <div>
      <ToastContainer pauseOnFocusLoss={false} pauseOnHover={false} draggable={false} />
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
                  placeholder="username@email.com"
                  register={register("email", {
                    required: "Email is required.",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address.",
                    },
                  })}
                  // onChange = {(e => setValues({...values, email:e.target.value}))}
                  error={errors.email}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <InputField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  // onChange={(e) => setValues({ ...values, password: e.target.value })}
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
                  onRightIconClick={togglePasswordVisibility}
                />
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

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
                disabled={isLoading}
                className="w-full bg-[#435090] text-white rounded-lg hover:bg-[#353869] focus:outline-none text-sm cursor-pointer"
                style={{
                  padding: "10px 5px",
                }}
              >
                {isLoading ? "Logging in..." : "Log in"}
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
                Do not have an account?{" "}
                <Link
                  to="/signup"
                  className="text-blue-500 hover:text-blue-900"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
