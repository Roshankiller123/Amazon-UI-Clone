import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  const register = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white h-screen">
      <Link to="/">
        <img
          className="mt-6 mb-6 w-28 object-contain"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt="Amazon Logo"
        />
      </Link>

      <div className="w-80 border border-gray-300 rounded-md p-6 flex flex-col">
        <h1 className="text-xl font-medium mb-4">Sign-In</h1>

        <form className="flex flex-col gap-3">
          <div>
            <h5 className="mb-1 text-sm">E-mail</h5>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <div>
            <h5 className="mb-1 text-sm">Password</h5>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-400 rounded-sm px-2 py-1 focus:outline-none focus:ring-1 focus:ring-yellow-500"
            />
          </div>

          <button
            type="submit"
            onClick={signIn}
            className="bg-yellow-400 border border-yellow-600 rounded-sm mt-2 py-2 text-sm font-medium hover:bg-yellow-500 transition"
          >
            Sign In
          </button>
        </form>

        <p className="mt-4 text-xs text-gray-600">
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          onClick={register}
          className="border border-gray-400 rounded-sm mt-4 py-2 text-sm font-medium hover:bg-gray-100 transition"
        >
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;
