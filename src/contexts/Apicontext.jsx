import axios from "axios";
import {  createContext, useContext } from "react";

const Apicontext = createContext()

export const useApi = () => useContext(Apicontext)




export const Apiprovider = ({ children }) => {
    const apiBaseUrl = "https://capstone-be-me7f.onrender.com/";
    const get = async (endpoint) => {
    try {
        const response = await axios.get(`${apiBaseUrl}${endpoint}`, {
          headers: {
            token: localStorage.getItem("token"), // Include the token in headers
          },
        });
        return response.data
    } catch (error) {
        console.error("Get request error", error)
        throw error
    }
}

const post = async (endpoint,data) => {
  try {
      const response = await axios.post(`${apiBaseUrl}${endpoint}`, data, {
        headers: {
          token: localStorage.getItem("token"), // Include the token in headers
        },
      });
    return response.data;
  } catch (error) {
    console.error("Post request error", error);
    throw error;
  }
};


return (
    <Apicontext.Provider value={{get,post}}>

        {children}
        
    </Apicontext.Provider>
)
}


