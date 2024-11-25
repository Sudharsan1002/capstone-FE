import React, { useState } from 'react'
import { useApi } from '../contexts/Apicontext';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const { post } = useApi()
    const [formData, setformData] = useState({
        name: "",
        email: "",
        password: "",
        role:""
    })
    const [message, setMessage] = useState("")
    const [error, setError] = useState("")
    const navigate=useNavigate()


    const handleChange = (e) => {
        const { name, value } = e.target
        setformData((prevData) => ({ ...prevData, [name]: value }))
        console.log(formData)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        setMessage("")
        try {
            const response = await post("auth/signup", formData)
            setMessage("Signup successful ! Redirecting...")
            setformData({
            name: "",
            email: "",
            password: "",
            role:""
            })
            setTimeout(() => navigate("/login"), 1500);
        } catch (error) {
           setError("Signup failed!!")
        }
    }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
      <div className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 xl:w-1/4">
        <h2 className="text-3xl text-center font-bold mb-5">SIGN UP</h2>

        <form
          className="flex flex-col bg-white items-center p-6 rounded-lg justify-around shadow-md"
          onSubmit={handleSubmit}
        >
          {message && (
            <p className="mt-4 text-center text-sm bg-green-100 p-2 w-full rounded text-green-600">
              {message}
            </p>
          )}
          {error && (
            <p className="mt-4 text-center text-sm bg-red-100 p-2 w-full rounded text-red-600">
              {error}
            </p>
          )}

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-lg font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              id="name"
              placeholder="Enter your name"
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
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

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-lg font-medium">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="flex flex-col gap-2 mb-4 w-full">
            <label className="text-lg font-medium">User Type</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              <option value="" disabled>
                Select your role
              </option>
              <option value="client">Client</option>
              <option value="counselor">Counselor</option>
            </select>
          </div>

          <div className="flex flex-col items-center gap-3 w-full">
            <button
              type="submit"
              className="w-full bg-orange-600 text-white py-3 rounded-md hover:bg-orange-500 transition-all"
            >
              Sign Up
            </button>
            <p className="text-sm text-gray-700">
              Already have an account?{" "}
              <a href="/login" className="text-blue-700 font-medium underline">
                Click here
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup