import React, { useState, useEffect } from "react";
import { login } from "../redux/authSlice";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { Link, useNavigate } from "react-router-dom";
import { GiExitDoor } from "react-icons/gi";


const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, error, message, user } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  // Redirect to Home if user is logged in
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
   <section className="overflow-hidden min-h-screen bg-gray-100">
  {/* Background image */}
  <img
    className=" w-full h-[20em] object-fit z-0 pointer-events-none"
    src="./images/Inventories.webp"
    alt="Background"
  />

  {/* Return Button */}
  <Link
    className="absolute top-8 left-[0em] z-20"
    to="/"
  >
    <GiExitDoor size={40} color="#2631ff" />
  </Link>

  {/* Form Section */}
  <div className=" z-10 mt-[-10em] flex justify-center items-center min-h-screen">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div className="flex flex-col">
          <label htmlFor="email" className="text-sm font-medium mb-1">
            Email:
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="p-2 w-[70%] mx-auto border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-medium mb-1">
            Password:
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
            className="mx-auto p-2 w-[70%] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-[30%] py-2 bg-[#ff9a25] mt-[.5em] rounded-md text-white font-medium ${
            isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      {/* Error & Message */}
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {message && <p className="mt-4 text-green-500 text-center">{message}</p>}

      {/* Links */}
      <div className="flex justify-between mt-6 pt-4 border-t border-gray-300">
        <div className="text-center">
          <h3 className="text-gray-600">Don’t have an account?</h3>
          <Link
            to="/signup"
            className="inline-block text-blue-500 hover:text-blue-700 font-medium mt-2"
          >
            <img className="w-[12%] max-[600px]:w-[15%]" src="./images/signup-again.png" />
          </Link>
        </div>
        <div className="text-center">
          <h3 className="text-gray-600">Forgot Password?</h3>
          <Link
            to="/forgot-password"
            className="inline-block text-blue-500 hover:text-blue-700 font-medium mt-2"
          >
            <img className="w-[12%] max-[600px]:w-[15%]" src="./images/forget.png" />
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>

   
  );
};

export default Login;
