import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { signup } from "../redux/authSlice";
import { GiExitDoor } from "react-icons/gi";
import { Link} from "react-router-dom"

const SignUp: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signup({ name, email, password, confirmPassword }));
  };

  return (
    <section className="relative overflow-hidden w-[100%]">
        <img className="w-[100%] h-[19em] px-[2em] absolute top-[-2em] left-[-1.9em]" src="./images/Signup.webp"/>
        <section className="flex items-center justify-center min-h-screen bg-gray-100">
     <section className="relative">
        <Link className="absolute w-[8em] max-[600px]:top-[-2.4em] top-[-2em] max-[600px]:left-[-3em] left-[-3em]" to="/"><GiExitDoor size={42} color={'##2631ff'} className="" /></Link>
      </section>
      <section className="bg-white mt-[12.5em] p-8 rounded-lg shadow-lg w-full max-w-md">


        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium mb-1">
              Name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              required
              className="p-2 w-[65%] max-[600px]:w-[100%] mx-[auto] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

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

          <div className="flex flex-col">
            <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">
              Confirm Password:
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="p-2 w-[65%] max-[600px]:w-[100%] mx-[auto] border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-[40%] bg-[#ff9a25] max-[600px]:w-[20%] mx-[auto] py-2 mt-[1em] rounded-md text-white font-medium ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Signing up..." : "Sign Up"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {message && <p className="mt-4 text-green-500 text-center">{message}</p>}
      </section>
    </section>
    </section>
    
  );
};

export default SignUp;
