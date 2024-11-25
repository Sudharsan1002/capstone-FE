import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/Authcontext'

function Login() {
    const{login}=useAuth()
    const [formData, setformData] = useState({
        email: "",
        password:""
    })

    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate()
    

    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setformData((prevData) => ({ ...prevData, [name]: value }));
      console.log(formData);
    };

   const handleSubmit = async (e) => {
     e.preventDefault();
     setError("");
     setMessage("");
     setIsLoading(true);
     try {
       await login(formData.email, formData.password); // Use the login method
       setMessage("Login successful. Redirecting...");
     } catch (error) {
       console.error("Login error:", error);
       setError(error.message || "An unknown error occurred");
     } finally {
       setIsLoading(false);
     }
   };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3  xl:w-1/4 mt-16">
        <h2 className="text-3xl text-center font-bold mb-5">LOG IN</h2>
        <form
          className="w-full bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          {message && (
            <p className="mt-4 text-center text-sm bg-green-100 p-2 rounded text-green-600">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-center text-sm bg-red-100 p-2 rounded text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2 mb-4">
            <label className="text-lg font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              id="email"
              placeholder="Enter your email"
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex flex-col gap-2 mb-4">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              id="password"
              placeholder="Enter your password"
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <div className="flex flex-col items-center">
            <button
              type="submit"
              className={`w-full bg-orange-600 text-white py-3 rounded-lg hover:bg-orange-500 transition-all ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Logging In..." : "LOG IN"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login 