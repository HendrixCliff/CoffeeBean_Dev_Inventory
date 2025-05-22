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
    <section className="relative overflow-hidden w-[100%]">
      <img className="w-[100%] h-[18em] px-[2em] absolute top-[-2em] left-[-1.9em]" src="./images/Inventories.webp"/>
         <section className="relative">
           <section className="flex items-center justify-center min-h-screen bg-gray-100">
            <Link className="absolute max-[600px]:top-[13em] top-[-1em] max-[600px]:left-[-2.5em] left-[-2em]" to="/"><GiExitDoor size={40} color={'#ff6e5a'} className="" /></Link>
          </section>
      <section className="bg-white max-[600px]:mt-[-22em] mt-[-22em] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center text-blue-600">Login</h2>
      
        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="p-2 w-[65%] max-[600px]:w-[100%] mx-[auto] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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
              className="p-2 w-[65%] max-[600px]:w-[100%] mx-[auto] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-[40%] max-[600px]:w-[20%] bg-[#ff9a25] mx-[auto] py-2 mt-[1em] rounded-md text-white font-medium' ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
        <section className="flex justify-between">
              <div className="mt-6 text-center border-t border-gray-300 pt-4">
          <h3 className="text-gray-600">Don’t have an account?</h3>
          <Link
            to="/signup"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            <img className="w-[10%] max-[600px]:w-[15%]" src="./images/signup-again.png"/>
          </Link>
        </div>
        <div className="mt-6 text-center border-t border-gray-300 pt-4">
          <h3 className="text-gray-600">Forgot Password?</h3>
          <Link
            to="/forgot-password"
            className="text-blue-500 hover:text-blue-700 font-medium"
          >
            <img className="w-[10%] max-[600px]:w-[15%]" src="./images/forget.png"/>
          </Link>
        </div>
        </section>
      </section>
    </section>
    </section>
   
  );
};

export default Login;
