import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import HomePageCategories from "./FrontEndComponents/HomePageCategories";
import WhyUsSection from "./FrontEndComponents/WhyUs";
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

   const pageStyle = {
      backgroundColor: "#f0f8ff", // Light gray for the entire page
      minHeight: "100vh", // Ensures it covers the viewport
      paddingTop: "15px", // Adds spacing at the top
      paddingBottom: "15px", // Adds spacing at the bottom
    };
  
    const transitionStyle = {
      textAlign: "center",
      color: "#0047AB", // Government blue
      margin: "20px", // Spacing around the transition heading
      fontSize: "34px",
      fontWeight: "bold",
    };
   if (!user) {
      return <div>Loading...</div>;
   }

   return (
      <div style={pageStyle}>
      <HomePageCategories />
      {/* Transition Heading */}
      <div style={transitionStyle}>
        Learn More About Us
      </div>
      <WhyUsSection />
    </div>
   );
}

export default Home;
