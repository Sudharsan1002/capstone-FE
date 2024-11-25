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
    <div className="mx-auto  mt-16 w-1/3  justify-center  ">
      <h2 className="text-3xl text-center font-bold mb-5">SIGN UP</h2>

      <form
        action=""
        className="flex flex-col container items-center p-6 rounded-lg justify-around border-2"
        onSubmit={handleSubmit}
      >
        {message && (
          <p className="mt-4 text-center text-sm bg-green-200 p-2 w-2/3 rounded text-green-500">
            {message}
          </p>
        )}
        {error && (
          <p className="mt-4 text-center text-sm  bg-red-200 p-2 w-2/3 rounded text-red-500">
            {error}
          </p>
        )}
        <div className="flex flex-col gap-2 mb-3 w-full">
          <label className="text-xl ">Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter your name"
            required
            className="border border-slate-600 p-2  rounded"
          />
        </div>
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
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
            className="border border-slate-600 p-2  rounded"
          />
        </div>

        <div className="flex flex-col gap-2 mb-3  w-full">
          <label className="block text-sm font-medium text-gray-700">
            User Type
          </label>
          <select
            id="role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded border border-slate-600 shadow-sm focus:border-orange-500 focus:ring-blue-500"
          >
            <option value="" disabled selected>
              Select your role
            </option>
            <option value="client">Client</option>
            <option value="counselor">Counselor</option>
          </select>
        </div>

        <div className="flex flex-col items-center justify-between gap-3">
          <button
            type="submit"
            className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-amber-600"
          >
            Sign Up
          </button>
          <p>
            Already having account ?
            <a href="/login" className="text-blue-700 font-bold underline">
              Click here
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Signup