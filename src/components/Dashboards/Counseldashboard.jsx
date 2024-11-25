import React, { useEffect, useState } from 'react'
import {  NavLink, useNavigate } from 'react-router-dom';
import { useApi } from '../../contexts/Apicontext';
import { useAuth } from '../../contexts/Authcontext';
import { parseISO, isValid,format } from "date-fns";

function Counseldashboard() {

    const { post,get } = useApi()
    const { isAuthenticated, user,token } = useAuth()
    const navigate=useNavigate()

    const [availableDate, setavailableDate] = useState('')
    const [availableTimes, setavailableTimes] = useState('')
    const [message, setmessage] = useState('')
    const [error, seterror] = useState('')
    const [sessions, setSessions] = useState([])
    const [isloading, setIsloading] = useState(false)

    // Redirect if not authenticated or if the user's role is not 'counselor'
    
    useEffect(() => {
        if (!isAuthenticated || user?.role !== "counselor") {
          navigate("/login")
      }
    }, [isAuthenticated, user, navigate])
    

    useEffect(() => {
        if (isAuthenticated && user?.role === "counselor") {
            const fetchSessions = async () => {
              try {
                  const response = await get(`sessions/bookings/${user.id}`, {
                    headers: {
                      token, // Include the token in headers
                    },
                  });
                  if (response.success && Array.isArray(response.data)) {
                    
                      
                      setSessions(response.data);
                    } else {
                      console.error("Unexpected response structure:", response);
                      setSessions([]);
                    }
              } catch (error) {
               console.error("error fetching sessions")
              } finally {
                  setIsloading(false)
              }
            }
            fetchSessions()
      }
    }, [isAuthenticated,user,get,token])
    

    

const handleSubmit = async (e) => {
  e.preventDefault();
  seterror("");
  setmessage("");
  setIsloading(true);

  try {
    const availabilityArray = availableDate.split(",").map((date) => {
      const trimmedDate = date.trim();
      const parsedDate = parseISO(trimmedDate);
      if (!isValid(parsedDate)) {
        throw new Error(`Invalid date format: ${trimmedDate}`);
      }
      return {
        date: trimmedDate,
        times: availableTimes.split(",").map((time) => {
          const [start, end] = time.split("-");
          if (!start || !end || start >= end) {
            throw new Error(`Invalid time range: ${time}`);
          }
          return time.trim();
        }),
      };
    });

    console.log("Availability Data Sent:", availabilityArray);

    const response = await post("availability", availabilityArray, {
      headers: {
        token: localStorage.getItem("token"),
      },
    });

    setmessage(response.message || "Availability updated successfully.");
    setavailableDate("");
    setavailableTimes("");
  } catch (error) {
    seterror(error.message || "Availability update failed.");
  } finally {
    setIsloading(false);
  }
};




  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Welcome,{user?.name}
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Manage your appointments and clients
        </p>
      </div>

      <section className="mt-8 bg-slate-200 p-4 rounded">
        <h2 className="text-xl sm:text-2xl font-semibold">
          Today's Appointments
        </h2>
        <ul className="mt-4 space-y-4">
          {isloading ? (
            <li>Loading...</li>
          ) : sessions?.length > 0 ? (
            sessions.map((session) => (
              <li
                key={session._id}
                className="p-4 border rounded-lg shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center"
              >
                <div className="mb-2 sm:mb-0">
                  <p className="text-lg font-semibold">
                    {session.client?.name}
                  </p>

                  <p className="text-sm text-gray-600">
                    {" "}
                    {new Date(session.sessionTime)
                      .toISOString()
                      .replace("T", " ")
                      .slice(0, 16)}
                  </p>
                </div>

                <a
                  href={session.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
                >
                  Join Meeting
                </a>
              </li>
            ))
          ) : (
            <li>No appointments today</li>
          )}
        </ul>
      </section>

      <section className="mt-8 bg-slate-200 p-4 rounded">
        <h2 className="text-xl sm:text-2xl font-semibold">Set Availability</h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          {message && (
            <p className="text-sm bg-green-200 text-green-800 p-2 rounded">
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm bg-red-200 text-red-800 p-2 rounded">
              {error}
            </p>
          )}
          <div>
            <label className="block text-lg font-semibold mb-2">
              Available Dates
            </label>
            <input
              type="text"
              value={availableDate}
              onChange={(e) => setavailableDate(e.target.value)}
              placeholder="e.g., 2024-11-21"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <div>
            <label className="block text-lg font-semibold mb-2">
              Available Time
            </label>
            <input
              type="text"
              value={availableTimes}
              onChange={(e) => setavailableTimes(e.target.value)}
              placeholder="e.g., 10:00-12:00,14:00-16:00"
              className="w-full border rounded p-2"
              required
            />
          </div>
          <button
            type="submit"
            className={`bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ${
              isloading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isloading}
          >
            {isloading ? "Updating..." : "Set Availability"}
          </button>
        </form>
      </section>

      <section className="mt-8  bg-slate-200 p-4 rounded">
        <h2 className="text-xl sm:text-2xl font-semibold">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4  ">
          <NavLink
            to="/sessionslist"
            className="bg-green-500 text-white p-4 rounded text-center hover:bg-green-600 shadow-sm"
          >
            Sessions
          </NavLink>
          <NavLink
            to="/clients"
            className="bg-yellow-500 text-white p-4 rounded text-center hover:bg-yellow-600 shadow-sm"
          >
            View Clients
          </NavLink>
          <NavLink
            to={`/sessionslist`} // Add notes for the session
            className="bg-green-600 text-white p-4 rounded hover:bg-green-700 text-sm text-center"
          >
            Add Notes
          </NavLink>
        </div>
      </section>

      <section className="mt-8  bg-slate-200 p-4 rounded">
        <h2 className="text-xl sm:text-2xl font-semibold">Your Profile</h2>
        <div className="p-4 border rounded-lg mt-4 shadow-sm">
          <p>
            <strong>Name :</strong>  <span className='text-blue-700 font-serif'>{user?.name}</span>
          </p>
          <p>
            <strong>Email :</strong> <span className='text-blue-700 font-serif'>{user?.email}</span>
          </p>
          <p>
            <strong>Specialization :</strong> <span className='text-blue-700 font-serif'>Relationship and Career Counseling</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Counseldashboard