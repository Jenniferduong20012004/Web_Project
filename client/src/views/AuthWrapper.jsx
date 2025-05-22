// import { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import Login from "./Login";
// import SignUp from "./Signup";

// const AuthWrapper = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const [isSignup, setIsSignup] = useState(location.pathname === "/signup");
//   const [isAnimating, setIsAnimating] = useState(false);

//   useEffect(() => {
//     const newIsSignup = location.pathname === "/signup";
//     if (newIsSignup !== isSignup) {
//       setIsAnimating(true);
//       setTimeout(() => {
//         setIsSignup(newIsSignup);
//         setTimeout(() => {
//           setIsAnimating(false);
//         }, 50);
//       }, 300);
//     }
//   }, [location.pathname, isSignup]);

//   const handleNavigation = (path) => {
//     if (location.pathname !== path) {
//       navigate(path);
//     }
//   };

//   return (
//     <div className="relative w-full min-h-screen overflow-hidden">
//       {/* Animated Container */}
//       <div
//         className={`w-full min-h-screen flex transition-all duration-700 ease-in-out ${
//           isAnimating ? "opacity-90" : "opacity-100"
//         }`}
//       >
//         {/* Left Side - Form Container */}
//         <div
//           className={`w-full lg:w-1/2 transition-all duration-700 ease-in-out transform ${
//             isSignup ? "translate-x-0" : "lg:translate-x-full lg:order-2"
//           }`}
//         >
//           <div className="w-full h-full flex items-center justify-center p-8 bg-white">
//             <div className="w-full max-w-md flex flex-col gap-y-5">
//               {isSignup ? (
//                 <SignupForm onNavigate={handleNavigation} />
//               ) : (
//                 <LoginForm onNavigate={handleNavigation} />
//               )}
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Image Container */}
//         <div
//           className={`hidden lg:block lg:w-1/2 relative transition-all duration-700 ease-in-out transform ${
//             isSignup
//               ? "translate-x-0 order-2"
//               : "lg:-translate-x-full lg:order-1"
//           }`}
//         >
//           <ImageSection isSignup={isSignup} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Extracted Login Form Component
// const LoginForm = ({ onNavigate }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // ... (include all your login logic here)

//   return (
//     <>
//       {/* Title */}
//       <div className="flex flex-col gap-y-3">
//         <h2 className="text-3xl font-bold text-gray-900">Log in to</h2>
//         <h2 className="text-3xl font-bold">
//           <span className="bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block">
//             TaskUP
//           </span>
//           <span className="text-black">!</span>
//         </h2>
//       </div>

//       {/* Form */}
//       <form className="w-full md:w-[400px] flex flex-col gap-y-3">
//         {/* Your existing login form fields */}

//         {/* Sign Up link with custom navigation */}
//         <p className="text-center text-gray-600 text-sm">
//           Do not have an account?{" "}
//           <button
//             type="button"
//             onClick={() => onNavigate("/signup")}
//             className="text-blue-500 hover:text-blue-900 cursor-pointer"
//           >
//             Sign up
//           </button>
//         </p>
//       </form>
//     </>
//   );
// };

// // Extracted Signup Form Component
// const SignupForm = ({ onNavigate }) => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   // ... (include all your signup logic here)

//   return (
//     <>
//       {/* Title */}
//       <div className="flex flex-col gap-y-3">
//         <h2 className="text-3xl font-bold text-gray-900">Sign Up for</h2>
//         <h2 className="text-3xl font-bold">
//           <span className="bg-gradient-to-r from-[#435090] to-[#3885c4] text-transparent bg-clip-text inline-block">
//             TaskUP
//           </span>
//           <span className="text-black">!</span>
//         </h2>
//       </div>

//       {/* Form */}
//       <form className="w-full md:w-[400px] flex flex-col gap-y-2">
//         {/* Your existing signup form fields */}

//         {/* Log in link with custom navigation */}
//         <p className="text-center text-gray-600 text-sm">
//           Already have an account?{" "}
//           <button
//             type="button"
//             onClick={() => onNavigate("/login")}
//             className="text-blue-500 hover:text-blue-900 cursor-pointer"
//           >
//             Log in
//           </button>
//         </p>
//       </form>
//     </>
//   );
// };

// // Image Section Component
// const ImageSection = ({ isSignup }) => {
//   return (
//     <>
//       <div
//         className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-300"
//         style={{
//           backgroundImage: `url(${isSignup ? bgImage : bgImage})`, // You can use different backgrounds
//           transform: "scale(1.02)",
//         }}
//       />

//       {/* Logo Container */}
//       <div className="absolute top-5 left-3 z-10">
//         <img src={logo} alt="TaskUP Logo" className="w-10 h-auto" />
//       </div>

//       {/* Image */}
//       <div className="relative h-screen flex items-center justify-center p-8">
//         <img
//           src={isSignup ? userSignup : userLoginImg}
//           alt={isSignup ? "Signup illustration" : "Login illustration"}
//           className="w-4/5 md:w-3/5 lg:w-2/3 xl:w-3/5 h-auto max-w-2xl object-contain transition-opacity duration-500"
//         />
//       </div>
//     </>
//   );
// };

// export default AuthWrapper;
