import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import MainPage from "./FrontEndComponents/MainContent";

function Home() {
   const { user, setUser } = useAuth();
   const navigate = useNavigate();

   useEffect(() => {
      const fetchUserData = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            alert("No active session. Please log in.");
            navigate("/login");
            return;
         }

         try {
            const response = await axios.get("http://localhost:3001/home", {
               headers: { token },
            });
            setUser(response.data);
         } catch (error) {
            alert("Session expired or invalid. Please log in again.");
            localStorage.removeItem("token");
            navigate("/login");
         }
      };

      fetchUserData();
   }, [navigate, setUser]);

   if (!user) {
      return <div>Loading...</div>;
   }

   return (
      <div>

         <MainPage />
      </div>
   );
}

export default Home;
