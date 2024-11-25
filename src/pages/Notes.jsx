import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useApi } from '../contexts/Apicontext'
import { useAuth } from '../contexts/Authcontext'

function Notes() {
  const { sessionId } = useParams();
  const { get, post } = useApi();
  const { token,user } = useAuth();
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchNotes = async (params) => {
      try {
        const response = await get(`notes/${sessionId}`, {
          headers: {
            token,
          },
        });

        if (response.success && Array.isArray(response.data)) {
          setNotes(response.data);
        }
      } catch (error) {
        console.error("Error fetching notes:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchNotes();
  }, [sessionId, get, token]);

  const handleAddNote = async () => {
    try {
      const response = await post(
        `notes/add/${sessionId}`,
        {
          sessionId,
          notes: noteText,
          counselorId:user.id
        },
        {
          headers: {
            token,
          },
        }
      );

      if (response.success) {
        setNotes([...notes, response.data]); // Add the new note to the list
        setMessage(response.data.message)
        setNoteText(""); // Clear the input field
      }
    } catch (error) {
        setError(error.response?.data?.message)
      console.error("Error adding note:", error);
    }
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold">Session Notes</h2>

      {isLoading ? (
        <p>Loading notes...</p>
      ) : (
        <>
          <div>
            {notes.length > 0 ? (
              notes.map((note) => (
                <div key={note._id} className="border p-4 my-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  <p>{note.notes}</p>
                  <p className="text-sm text-gray-500">
                    Added by: {note.counselorId?.name}
                  </p>
                </div>
              ))
            ) : (
              <p>No notes available for this session.</p>
            )}
          </div>
          {/* Add Note Form */}
          {user?.role==="counselor"?
           <div className="mt-4">
            <div>
                {message && (
            <p className="text-sm bg-green-200 text-green-800 p-2 rounded">
              {message}
            </p>
          )}
          {error && (
            <p className="text-sm bg-red-200 text-red-800 p-2 rounded">
              {error}
            </p>)}
            </div>
            <textarea
              value={noteText}
              onChange={(e) => setNoteText(e.target.value)}
              placeholder="Add a new note"
              className="w-full p-2 border rounded"
            />
            <button
              onClick={handleAddNote}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-800"
            >
             {isLoading?"Adding...": "Add Note"} 
            </button>
          </div>:
          <div></div>
          
          }
         
        </>
      )}
    </div>
  );
}
          

export default Notes