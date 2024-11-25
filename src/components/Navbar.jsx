import React from 'react'
import { NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/Authcontext';
import img1 from '../assets/counsel2.png'
function Navbar() {
    const { logout } = useAuth()
    
  return (
    <div>
      <div className="flex justify-around items-center bg-slate-400 p-4 rounded-md">
        <div className="text-2xl font-bold font-serif"><img src={img1} alt="" /></div>
        <div className="flex justify-around gap-5 items-center">
          <div>
            <NavLink
              to="/"
              className="font-semibold bg-slate-200 py-2 px-4 rounded hover:bg-slate-300 active:bg-slate-400 text-lg"
            >
              Home
            </NavLink>
          </div>
          <div className="logout">
            <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-amber-600 active:bg-orange-700 text-lg" onClick={logout}>
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar