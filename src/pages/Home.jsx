import React from 'react'
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className=" flex justify-center items-center">
      <div className="text-center mt-10 ">
        <h1 className="text-4xl font-bold font-serif mb-5">
          WELCOME TO THE COUNSELLING PLATFORM
        </h1>
        <p className="text-xl font-semibold font-serif mb-5">
          We are here for your good
        </p>
        <p className="text-xl font-semibold font-serif mb-5">
          Connecting you with licensed counsellors securely{" "}
        </p>

        <div className="mt-6">
          <NavLink to="/signup">
            <button className="bg-blue-300 px-4 py-2 rounded">
              Get started →{" "}
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Home