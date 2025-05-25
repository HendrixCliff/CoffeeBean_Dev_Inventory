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
    <section className="relative overflow-hidden">
      <img className="w-[100%] h-[24em] px-[2em] absolute top-[-2.4em] left-[-1.9em]" src="./images/Forgot_Password.webp"/>
          <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="relative">
           <Link className="absolute max-[600px]:top-[3em] bottom-[-7em] max-[600px]:left-[1em] left-[1em]" to="/"><GiExitDoor size={36} color={'#2631ff'} className="" /></Link>
         </section>
      <section className="bg-white mt-[15em] p-8 rounded-lg shadow-lg w-full max-w-md">


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
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        {typeof error === "string" && (
          <p className="mt-4 text-red-500 text-center">{error}</p>
        )}
        {typeof message === "string" && (
          <p className="mt-4 text-green-500 text-center">{message}</p>
        )}
      </section>
    </section>
    </section>

  );
};

export default ForgotPassword;
