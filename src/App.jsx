import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login ";
import Sessionslist from "./components/Sessions/Sessionslist";
import Clientdashboard from "./components/Dashboards/Clientdashboard";
import Booksessions from "./components/Sessions/Booksessions";
import Counseldashboard from "./components/Dashboards/Counseldashboard";
import PrivateRoute from "./components/PrivateRoute";
import Notes from "./pages/Notes";
import ClientsList from "./components/Sessions/Clientslist";
import Clientnotes from "./pages/Clientnotes";

function App() {
  return (
    <div className="mx-auto container">
      <Navbar />

      <div className="min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/booksessions" element={<Booksessions />} />
          <Route path="/sessionslist" element={<Sessionslist />} />
          <Route path="/client" element={<Clientdashboard />} />
          <Route path="/notes/add/:sessionId" element={<Notes />} />
          <Route path="/notes/:sessionId" element={<Notes />} />
          <Route path="/clients" element={<ClientsList />} />
          <Route path="/notes/client/:userId" element={<Clientnotes />} />
          <Route
            path="/counselor"
            element={
              <PrivateRoute allowedRoles={["counselor"]}>
                <Counseldashboard />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>

      <Footer />
    </div>
  );
}

export default App;
