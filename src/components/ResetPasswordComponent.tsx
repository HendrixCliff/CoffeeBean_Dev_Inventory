import React, { useState } from "react";
import {  useParams } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { resetPassword } from "../redux/authSlice";
import { GiExitDoor } from "react-icons/gi";
import { Link} from "react-router-dom"
 
const ResetPassword: React.FC = () => {
  const dispatch = useAppDispatch();
  //const navigate = useNavigate();
  const { token } = useParams<{ token: string }>();

  const { isLoading, error, message } = useAppSelector((state) => state.auth);

  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!token) {
      console.error("Token not found in URL");
      return;
    }

    dispatch(resetPassword({ token, password, confirmPassword }));
  };

  return (
    <section className="relative overflow-hidden w-[100%]">
      <img className="w-[100%] h-[24em] px-[2em]  absolute top-[-.01em] left-[-1.9em]" src="/images/reset-password.webp"/>
       <section className="flex items-center justify-center min-h-screen bg-gray-100">
        <section className="relative">
           <Link className="absolute max-[600px]:top-[5.4em] max-[600px]:left-[-.3em] top-[7em] left-[1em]" to="/"><GiExitDoor size={36} color={'#ff6e5a'} className="" /></Link>
        </section>
      <section className="bg-white p-8 mt-[22em] rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Reset Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium mb-1">
              New Password:
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter new password"
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
            className={`w-[40%] max-[600px]:w-[20%] bg-[#ff9a25] mx-[auto] py-2 mt-[1em] rounded-md text-white font-medium ${
              isLoading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {message && (
          <p className="mt-4 text-green-500 text-center">{message}</p>
        )}
      </section>
    </section>
    </section>
   
  );
};

export default ResetPassword;
