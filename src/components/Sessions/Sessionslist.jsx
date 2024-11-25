import React, { useEffect, useState } from 'react'
import { useApi } from '../../contexts/Apicontext';
import { useAuth } from '../../contexts/Authcontext';
import { NavLink } from 'react-router-dom';

function Sessionslist() {
     const { get } = useApi();
     const { user, token } = useAuth();
     const [sessions, setSessions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    

     useEffect(() => {
       const fetchSessions = async () => {
         try {
           let url = "";
           if (user?.role === "counselor") {
             // Fetch sessions for the counselor
             url = `sessions/bookings/${user.id}`;
           } else if (user?.role === "client") {
             // Fetch sessions for the client
             url = `sessions/bookings/${user.id}`;
           }

           const response = await get(url, {
             headers: {
               token,
             },
           });

           if (response.success && Array.isArray(response.data)) {
             setSessions(response.data);
           } else {
             setSessions([]);
           }
         } catch (error) {
           console.error("Error fetching sessions:", error);
           setSessions([]);
         } finally {
           setIsLoading(false);
         }
       };

       if (user?.role) {
         fetchSessions();
       }
     }, [user, get, token]);


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Scheduled Sessions
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          View and manage your upcoming sessions.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white shadow-md rounded-lg">
          <thead>
            <tr className="bg-slate-200 text-gray-600 text-left text-sm uppercase">
              <th className="py-3 px-6">
                {user?.role === "client" ? "Counselor Name" : "Client Name"}
              </th>
              <th className="py-3 px-6">Date&Time</th>
              <th className="py-3 px-6">Session Type</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sessions.length > 0 ? (
              sessions.map((session) => (
                <tr
                  key={session._id}
                  className="border-t hover:bg-gray-50 bg-slate-100"
                >
                  <td className="py-3 px-6">
                    {user?.role === "counselor"
                      ? session.client?.name
                      : session.counselor?.name}
                  </td>

                  <td className="py-3 px-6">
                    {new Date(session.sessionTime)
                      .toISOString()
                      .replace("T", " ")
                      .slice(0, 16)}
                  </td>
                  <td className="py-3 px-6">{session.sessionType}</td>
                  <td className="py-3 px-6 text-center">
                    {user?.role === "client" ? (
                      <NavLink
                        to={`/notes/${session._id}`} // View notes for the session
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-sm"
                      >
                        View Notes
                      </NavLink>
                    ) : (
                      <NavLink
                        to={`/notes/add/${session._id}`} // Add notes for the session
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm"
                      >
                        Add Notes
                      </NavLink>
                      
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-3 px-6">
                  No sessions scheduled.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Sessionslist