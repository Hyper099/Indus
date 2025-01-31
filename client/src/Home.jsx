import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import HomePageCategories from "./FrontEndComponents/HomePageCategories";
import WhyUsSection from "./FrontEndComponents/WhyUs";
import { Alert } from "react-bootstrap";

const Home = () => {
   const { user, setUser } = useAuth();
   const navigate = useNavigate();
   const [warnings, setWarnings] = useState([]);
   const [showWarnings, setShowWarnings] = useState(true);

   useEffect(() => {
      const fetchData = async () => {
         const token = localStorage.getItem("token");

         if (!token) {
            alert("No active session. Please log in.");
            navigate("/login");
            return;
         }

         try {
            // Fetch user data
            const userResponse = await axios.get("http://localhost:3001/home", {
               headers: { token },
            });
            setUser(userResponse.data);

            // Fetch unread notifications
            const notificationsResponse = await axios.get(
               "http://localhost:3001/notifications/unread-count",
               { headers: { token } }
            );
            const { unreadCount } = notificationsResponse.data;
            if (unreadCount > 0) {
               alert(`You have ${unreadCount} new notification${unreadCount > 1 ? "s" : ""}!`);
            }

            const warningsResponse = await axios.get("http://localhost:3001/warnings", {
               headers: { token },
            });
            setWarnings(warningsResponse.data);

            
         } catch (error) {
            console.error("Error fetching data:", error);
            if (error.response && error.response.status === 401) {
               alert("Session expired or unauthorized. Please log in again.");
            } else {
               alert("An error occurred. Please try again later.");
            }
            localStorage.removeItem("token");
            navigate("/login");
         }
      };

      fetchData();
   }, [navigate, setUser]);

   if (!user) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="animate-pulse text-2xl text-blue-800 font-semibold">Loading...</div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-6">
               {/* Warnings Section */}
               {showWarnings && warnings.length > 0 && (
                  <div className="rounded-2xl shadow-lg bg-white p-4">
                     {warnings.map((warning, index) => (
                        <Alert
                           key={index}
                           variant="danger"
                           onClose={() => setShowWarnings(false)}
                           dismissible
                        >
                           <strong>Emergency Alert:</strong> {warning.warning}
                        </Alert>
                     ))}
                  </div>
               )}

               {/* Categories Section */}
               <section className="rounded-2xl shadow-lg bg-white p-8 transform hover:scale-[1.02] transition-transform duration-300">
                  <HomePageCategories />
               </section>

               {/* Learn More Section */}
               <section className="text-center space-y-8">
                  <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-800 inline-block transform hover:scale-105 transition-transform duration-300">
                     Learn More About Us
                  </h2>

                  <div className="rounded-2xl shadow-lg bg-white p-8 transform hover:scale-[1.02] transition-transform duration-300">
                     <WhyUsSection />
                  </div>
               </section>
            </div>
         </div>
      </div>
   );
};

export default Home;
