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
    <div className="mx-auto  mt-16 w-1/3  justify-center  ">
      <h2 className="text-3xl text-center font-bold mb-5">LOG IN</h2>
      <form
        action=""
        className="flex flex-col container items-center p-6 rounded-lg justify-around border-2"
        onSubmit={handleSubmit}
      >
        {message && (
          <p className="mt-4 text-center text-sm bg-green-200 p-2 w-2/3 rounded text-green-500">
            {message}{" "}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm  bg-red-200 p-2 w-2/3 rounded text-red-500">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-2 mb-3 w-full">
          <label className="text-xl ">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            id="email"
            placeholder="Enter your email"
            required
            className="border border-slate-600 p-2  rounded"
          />
        </div>
        <div className="flex flex-col gap-2 mb-3  w-full">
          <label className="text-xl ">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            required
            className="border border-slate-600 p-2  rounded"
          />
        </div>
        <div className="flex flex-col items-center justify-between gap-3">
          <button
            type="submit"
            className={`bg-orange-600 text-white px-4 py-2 rounded hover:bg-amber-600 ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading} // Disable button during loading
          >
            {isLoading ? "Logging In..." : "LOG IN"}
          </button>
         
        </div>
      </form>
    </div>
  );
}

export default Login 