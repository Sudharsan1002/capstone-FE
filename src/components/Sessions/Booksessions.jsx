import React, { useEffect, useState } from 'react'
import { useApi } from '../../contexts/Apicontext';
import { useAuth } from '../../contexts/Authcontext';

function Booksessions() {
  const{token}=useAuth()
  const { post, get } = useApi();
  const [counselors, setCounselors] = useState([]);
  const [selectedCounselor, setSelectedCounselor] = useState("");
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimings, setAvailableTimings] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [sessionType, setSessionType] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
   const [isLoading, setIsLoading] = useState(false);

  // Format dates to a readable format
  const formatDate = (date) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  // Format times to a readable format
  // Format times to a readable format
  const formatTime = (time) => {
    return time; // Directly return the time string, which is in the correct format (e.g., "10:00-12:00")
  };

  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await get("users/counselors");
        setCounselors(response.counselors || []);
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };
    fetchCounselors();
  }, [get]);

  const handleCounselorChange = async (e) => {
    const counselorId = e.target.value;
    setSelectedCounselor(counselorId);

    // Fetch availability for the selected counselor

    try {
      const response = await get(`availability/${counselorId}`);
      const availabilityData = response.availability || [];

      const datesWithTimes = availabilityData.map((item) => ({
        date: item.date,
        times: item.times,
      }));

      setAvailableDates(datesWithTimes);
      setAvailableTimings([]);
      setSelectedDate("");
      setSelectedTime("");
    } catch (error) {
      console.error("Failed to fetch availability:", error);
      setError("Unable to fetch availability for the selected counselor");
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);

    const selectedAvailability = availableDates.find(
      (availability) =>
        new Date(availability.date).toDateString() ===
        new Date(date).toDateString()
    );
    setAvailableTimings(selectedAvailability?.times || []);
  };

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setMessage("");
  setError("");
  setIsLoading(true)

  const token = localStorage.getItem("token");
  if (!token) {
    setError("You are not authenticated. Please log in.");
    return;
  }

  if (!selectedCounselor || !selectedDate || !selectedTime || !sessionType) {
    setError("Please complete all fields.");
    return;
  }

  // Ensure selectedDate is in a valid ISO format
  const selectedDateObj = new Date(selectedDate.trim()); // Trim to remove any unnecessary spaces
  const isValidDate = !isNaN(selectedDateObj.getTime()); // Check if the date is valid

  if (!isValidDate) {
    setError("Invalid date selected.");
    return;
  }

  // Clean up selectedTime by trimming spaces
  const trimmedTime = selectedTime.trim();

  let sessionTime = null;
  let isValidTime = false;

  // Handle case where selectedTime contains a range (e.g. '10:00-12:00')
  if (trimmedTime.includes("-")) {
    const [startTime, endTime] = trimmedTime.split("-"); // Split into start and end time
    const startParts = startTime.split(":");

    // Validate start time format
    isValidTime = startParts.length === 2 && startParts[0] && startParts[1];

    if (isValidTime) {
      // Construct sessionTime using the start time from the range
      // Using the selected date and the start time (e.g. 10:00)
      sessionTime = new Date(
        `${selectedDateObj.toISOString().split("T")[0]}T${startTime.trim()}:00Z`
      );
    }
  } else {
    // Validate standard time format (e.g., '14:00')
    const timeParts = trimmedTime.split(":");
    isValidTime = timeParts.length === 2 && timeParts[0] && timeParts[1];

    if (isValidTime) {
      // Construct sessionTime using the selected time
      sessionTime = new Date(
        `${
          selectedDateObj.toISOString().split("T")[0]
        }T${timeParts[0].trim()}:${timeParts[1].trim()}:00Z`
      );
    }
  }

  // Debug logs
  console.log("Selected Date:", selectedDateObj);
  console.log("Selected Time:", selectedTime);
  console.log("Constructed sessionTime:", sessionTime);

  // Check if both date and time are valid
  if (isNaN(sessionTime)) {
    setError("Invalid date or time selected.");
    return;
  }

  try {
    await post(
      "sessions/booksessions",
      {
        counselorId: selectedCounselor,
        sessionTime: sessionTime.toISOString(), // Use the constructed sessionTime
        sessionType,
      },
      {
        headers: { token }, // Pass token in headers
      }
    );

    setMessage("Session booked successfully");
    setSelectedCounselor("");
    setSelectedDate("");
    setSelectedTime("");
    setSessionType("");
  } catch (error) {
    console.error("Failed to book session:", error);
    setError(error.response?.data?.message || "Unable to book session.");
  } finally {
    setIsLoading(false)
  }
};


  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold">
          Create a New Session
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Fill out the form below to schedule a session.
        </p>
      </div>

      <form
        className="max-w-2xl mx-auto bg-slate-200 p-6 rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {message && (
          <p className="bg-green-200 text-green-800 p-2 rounded">{message}</p>
        )}
        {error && (
          <p className="bg-red-200 text-red-800 p-2 rounded">{error}</p>
        )}
        {/* <div className="mb-6">
          <label
            htmlFor="clientName"
            className="block text-sm font-medium text-gray-700"
          >
            Client Name
          </label>
          <input
            type="text"
            id="clientName"
            placeholder="Enter client name"
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div> */}

        <div className="mb-6">
          <label
            htmlFor="counselorName"
            className="block text-sm font-medium text-gray-700"
          >
            Counselor Name
          </label>
          <select
            name="counselor"
            id="counselor"
            value={selectedCounselor}
            onChange={handleCounselorChange}
            className="mt-1 block w-full p-2 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a counselor
            </option>
            {counselors.map((counselor) => (
              <option key={counselor._id} value={counselor._id}>
                {counselor.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <select
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Selected a date
            </option>
            {availableDates.map((availability, index) => (
              <option key={index} value={availability.date}>
                {formatDate(availability.date)}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>

          <select
            name="time"
            id="time"
            value={selectedTime}
            onChange={(e) => {
              console.log("Selected Time onChange:", e.target.value); // Debug log
              setSelectedTime(e.target.value);
            }}
            className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>
              Select a time
            </option>
            {availableTimings.map((time, index) => (
              <option key={index} value={time}>
                {time}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-6">
          <label
            htmlFor="sessionType"
            className="block text-sm font-medium text-gray-700"
          >
            Session Type
          </label>
          <select
            id="sessionType"
            value={sessionType}
            onChange={(e) => setSessionType(e.target.value)}
            className="mt-1 block w-full rounded-md p-2 border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="" disabled>
              Select session type
            </option>
            <option value="mentalHealth">Mental Health</option>
            <option value="relationshipAdvice">Relationship Advice</option>
            <option value="careerCounseling">Career Counseling</option>
          </select>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            disabled={isLoading}
          >
            {isLoading ? "Booking..." : "Book"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Booksessions