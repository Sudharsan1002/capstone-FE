import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { useApi } from '../../contexts/Apicontext';
import { useAuth } from '../../contexts/Authcontext';

function Clientdashboard() {
    const { get } = useApi()
    const { isAuthenticated, user, token } = useAuth()
    const navigate = useNavigate()

      const [message, setMessage] = useState("");
      const [error, setError] = useState("");
      const [sessions, setSessions] = useState([]);
      const [isloading, setIsloading] = useState(false);
    

    
    
    
useEffect(() => {
    if (!isAuthenticated && user?.role !== "client") {
      navigate("/login")
  }
}, [isAuthenticated,user,navigate])


 useEffect(() => {
   if (isAuthenticated && user?.role === "client") {
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
         console.error("error fetching sessions");
       } finally {
         setIsloading(false);
       }
     };
     fetchSessions();
   }
 }, [isAuthenticated, user, get, token]);

    
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          {" "}
          Welcome <span className='text-blue-600'>{user?.name}!!</span>
        </h1>
        <p className="mt-2 text-sm sm:text-base ">Your personal dashboard</p>
      </div>

      <section className="mt-8 border-2 px-4 rounded-md bg-slate-200">
        <h2 className="text-xl sm:text-2xl font font-semibold">
          {" "}
          Upcoming Appointments
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
                    CounselorName :{" "}
                    <span className="font-serif text-blue-600">
                      {session.counselor?.name}
                    </span>
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
                  Join Session
                </a>
              </li>
            ))
          ) : (
            <li>No appointments today</li>
          )}
        </ul>
      </section>

      <section className="mt-8 border-2 px-4 rounded-md bg-slate-200">
        <h2 className="text-xl sm:text-2xl font-semibold">Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4 text-center mb-4">
          <NavLink
            to="/booksessions"
            className="bg-orange-300 rounded p-4  hover:bg-orange-400"
          >
            Book Session
          </NavLink>
          <NavLink
            to={`/notes/client/${user.id}`}
            className="bg-green-300 rounded p-4 hover:bg-green-400"
          >
            View Notes
          </NavLink>
          <NavLink
            to="/sessionslist"
            className="bg-cyan-300 p-4 rounded hover:bg-sky-300"
          >
            Sessions List
          </NavLink>
        </div>
      </section>

      <section className="mt-8 border-2 px-4 rounded-md bg-slate-200">
        <h2 className="text-xl sm:text-2xl font-semibold">Your Profile</h2>
        <div className="p-4 border rounded-lg mt-4 shadow-sm">
          <p>
            <strong>Name :</strong> <span className='text-blue-700 font-serif'>{user?.name}</span>
          </p>
          <p>
            <strong>Email :</strong> <span className='text-blue-700 font-serif'>{user?.email}</span>
          </p>
          <p>
            <strong>Role :</strong> <span className='text-blue-700 font-serif'>Client</span>
          </p>
        </div>
      </section>
    </div>
  );
}

export default Clientdashboard