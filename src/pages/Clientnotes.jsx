import React, { useEffect, useState } from "react";
import { useApi } from "../contexts/Apicontext";
import { useAuth } from "../contexts/Authcontext";

function Clientnotes() {
  const { get } = useApi();
  const { isAuthenticated, user, token } = useAuth();
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Only fetch notes if the user is authenticated and is a client
    if (isAuthenticated && user?.role === "client") {
      const fetchNotes = async () => {
        setIsLoading(true);
        setError("");
        try {
          const response = await get(`notes/client/${user.id}`, {
            headers: { token },
          });

            if (response.success && Array.isArray(response.data)) {
              console.log(response.data)
            setNotes(response.data);
          } else {
            setError(response.message || "Failed to fetch notes.");
          }
        } catch (err) {
          setError("An error occurred while fetching notes.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchNotes();
    }
  }, [isAuthenticated, user, get, token]);

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4">Session Notes</h1>
      {isLoading ? (
        <p>Loading notes...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notes.length > 0 ? (
        <ul className="space-y-4">
          {notes.map((note) => (
            <li
              key={note._id}
              className="p-4 border rounded-lg shadow-sm bg-slate-200"
            >
              
              <p className="mt-2">
                <strong>Counselor:</strong> {note.counselorId?.name}
              </p>
              <p className="mt-2">
                <strong>Notes:</strong> {note.notes}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No notes available for your sessions.</p>
      )}
    </div>
  );
}

export default Clientnotes;
