import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useApi } from "../../contexts/Apicontext";
import { useAuth } from "../../contexts/Authcontext";

function ClientsList() {
  const { get } = useApi();
  const { token, user } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
      const fetchClients = async () => {
        const counselorId=user.id
      try {
        const response = await get(`users/clients/${counselorId}`, {
          headers: {
            token,
          },
        });
        if (response.success) {
          setClients(response.data);
        } else {
          setError(response.message || "Failed to fetch clients.");
        }
      } catch (err) {
        setError(err.message || "An error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [get, token, user.id]);

  if (loading) return <p>Loading clients...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-2xl font-semibold mb-4">Clients</h2>
      {clients.length > 0 ? (
        <ul className="space-y-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <li
              key={client._id}
              className="p-4 border rounded-lg shadow-sm  bg-orange-100"
            >
              <p>
                <strong>Name:</strong> {client.name}
              </p>
              <p>
                <strong>Email:</strong> {client.email}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No clients available.</p>
      )}
    </div>
  );
}

export default ClientsList;
