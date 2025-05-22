import React, { useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { forgotPassword } from "../redux/authSlice";
import { GiExitDoor } from "react-icons/gi";
import { Link} from "react-router-dom"

const ForgotPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const [email, setEmail] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword({ email })); 

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="relative">
           <Link className="absolute max-[600px]:top-[-2.4em] max-[600px]:left-[-2em] left-[1em]" to="/"><GiExitDoor size={36} color={'#ff6e5a'} className="" /></Link>
         </section>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Forgot Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium mb-1">
              Enter your email:
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your registered email"
              required
              className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className={`w-full py-2 mt-4 rounded-md text-white font-medium ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {typeof error === "string" && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {typeof message === "string" && (
          <p className="mt-4 text-green-500 text-center">{message}</p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
