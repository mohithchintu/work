import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [userid, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const { signin } = useAuth();
  const navigate = useNavigate();

  const handleCancel = () => {
    setUserId("");
    setPassword("");
    setIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      userid: userid,
      password: password,
    };
    if (userid === "chintu" && password === "1234") {
      signin();
      navigate("/home");
      setIsOpen(false);
    }
  };

  return (
    <div className="relative inline-block text-left">
      <div className="font-semibold">
        <button onClick={() => setIsOpen(!isOpen)}>Sign In</button>
      </div>
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <form onSubmit={handleSubmit}>
              <div className="px-4 py-3">
                <label className="block text-sm font-medium">User ID</label>
                <input
                  type="text"
                  value={userid}
                  onChange={(e) => setUserId(e.target.value)}
                  className="mt-1 p-1 block w-full border border-teal-300 rounded-md shadow-sm"
                />
              </div>
              <div className="px-4 py-3">
                <label className="block text-sm">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-1 block w-full border border-teal-300 rounded-md shadow-sm"
                />
              </div>
              <div className="flex px-4 py-3 gap-2">
                <button
                  type="submit"
                  className="w-full justify-center rounded-md border border-transparent shadow-sm px-3 py-2 bg-teal-500 hover:bg-teal-600 font-medium text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full justify-center rounded-md border border-gray-300 shadow-sm px-2 py-1 bg-white hover:bg-slate-100 font-medium text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
