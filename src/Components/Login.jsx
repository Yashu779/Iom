import React, { useState } from "react";
import twitterIcn from "../assets/Vector.svg";
import GoogleIcn from "../assets/Google.svg";
import FacebookIcn from "../assets/facebook.svg";
import { signUp, logIn, signInWithGoogle } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const Navigate = useNavigate();

  const handleToggleForm = () => {
    setIsLogin(!isLogin);
    setError("");
    setEmail("");
    setPassword("");
  };

  const validateForm = () => {
    if (!email || !password) {
      return "Email and password are required.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    if (password.length < 6) {
      return "Password must be at least 6 characters long.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
  
    if (validationError) {
      setError(validationError);
      console.log("Validation failed");
      return;
    }
  
    try {
      if (isLogin) {
        // Attempt to log in
        const user = await logIn(email, password);
        if (user.error) {
          console.log("Login failed:", user.error);
          alert("User Details Not Available");
          return;
        }
        console.log("User logged in successfully");
        alert("Logged in successfully!");
        Navigate("/buying-products"); // Navigate after login
      } else {
        // Attempt to sign up
        const user = await signUp(email, password);
        if (user.error) {
          setError(user.error);
          console.log("Signup failed:", user.error);
          return;
        }
        console.log("User signed up successfully");
        alert("Account created successfully! Redirecting to login...");
  
        // Automatically redirect to login
        setIsLogin(true);
      }
  
      // Reset form fields
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err.message);
      console.log("Error:", err.message);
    }
  };
  

  const handleGoogleLogin = async () => {
    try {
      const user = await signInWithGoogle();
      if (user) {
        console.log("Google login successful", user);
        // alert(`Welcome, ${user.displayName || user.email}!`);
  
        // Optional: Navigate to another page or handle the user object
        Navigate("/buying-products");
      }
    } catch (err) {
      setError(err.message);
      console.log("Google login error:", err.message);
    }
  };
  

  return (
    <div className="flex flex-col lg:flex-row min-h-screen items-center bg-gray-100 p-8 justify-between">
      {/* Left Section */}
      <div className="lg:w-1/2 w-full flex flex-col items-center justify-between text-left lg:text-left pt-10 lg:pt-0 lg:h-[85vh] gap-10">
        <div className="text-left flex flex-col">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4 text-shadow-xl animate-text-fade">
            Log in Sign up
          </h1>
          <p className="text-base lg:text-lg text-[#1E1E1E] pt-5">
            Use this Button in any of your project for free.
          </p>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-col lg:flex-row lg:space-x-4 space-y-4 lg:space-y-0 items-center justify-center sm:mt-10 sm:pt-20">
            <button
              onClick={handleToggleForm}
              className={`px-6 py-4 rounded-full w-full lg:w-auto ${
                isLogin
                  ? "bg-[#3792DE] text-white border-[#3792DE]"
                  : "bg-transparent text-[#3792DE] border border-gray-400"
              }`}
            >
              Log in
            </button>
            <button
              onClick={handleToggleForm}
              className={`px-6 py-4 rounded-full w-full lg:w-auto ${
                !isLogin
                  ? "bg-[#3792DE] text-white border-[#3792DE]"
                  : "bg-transparent text-[#3792DE] border border-gray-400"
              }`}
            >
              Sign up
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-6 ml-15">
            Copy the button and use it in your designs or you can copy the
            components from the assets page.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="lg:w-1/3">
        <div className="w-full bg-white shadow-lg rounded-lg p-6 lg:p-10 mt-10 lg:mt-0">
          <h2 className="text-4xl font-bold mb-6 text-center">
            {isLogin ? "Log In" : "Sign Up"}
          </h2>

          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center bg-[#5985E5] text-white py-4 rounded mb-4"
          >
            <img src={GoogleIcn} alt="Google Logo" className="mr-2" />
            Continue with Google
          </button>

          <button className="w-full flex items-center justify-center bg-white text-[#1E1E1E] py-3 rounded mb-4 border-2 border-gray-300">
            <img src={FacebookIcn} alt="Facebook Logo" className="mr-2" />
            Continue with Facebook
          </button>

          <button className="w-full flex items-center justify-center bg-white text-[#1E1E1E] py-4 rounded mb-4 border-2 border-gray-300">
            <img src={twitterIcn} alt="Twitter Logo" className="mr-2" />
            Continue with Twitter
          </button>

          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-4 text-gray-500">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-4 mb-4"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-4 mb-4"
            />
            <button
              type="submit"
              className={`w-full ${
                isLogin ? "bg-[#3792DE]" : "bg-green-600"
              } text-white py-4 rounded mb-2`}
            >
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </form>

          {isLogin && (
            <p className="text-center text-[#b2afaf]">
              <a href="#" className="text-sm">
                Forgot Password?
              </a>
            </p>
          )}
        </div>
        <p className="text-center mt-4">
          {isLogin ? (
            <>
              Don&apos;t have an account?{" "}
              <button
                onClick={handleToggleForm}
                className="text-blue-600 font-semibold"
              >
                Signup Now.
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                onClick={handleToggleForm}
                className="text-blue-600 font-semibold"
              >
                Log in.
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
