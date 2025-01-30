import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import HomePageCategories from "./FrontEndComponents/HomePageCategories";
import WhyUsSection from "./FrontEndComponents/WhyUs";

const Home = () => {
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
            const userResponse = await axios.get("http://localhost:3001/home", {
               headers: { token },
            });
            setUser(userResponse.data);

            const notificationsResponse = await axios.get(
               "http://localhost:3001/notifications/unread-count",
               {
                  headers: { token },
               }
            );

            const { unreadCount } = notificationsResponse.data;
            if (unreadCount > 0) {
               alert(
                  `You have ${unreadCount} new notification${unreadCount > 1 ? "s" : ""
                  }!`
               );
            }
         } catch (error) {
            console.error("Error fetching user or notifications data:", error);
            if (error.response && error.response.status === 401) {
               alert("Session expired or unauthorized. Please log in again.");
            } else {
               alert("An error occurred. Please try again later.");
            }
            localStorage.removeItem("token");
            navigate("/login");
         }
      };

      fetchUserData();
   }, [navigate, setUser]);

   if (!user) {
      return (
         <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="animate-pulse text-2xl text-blue-800 font-semibold">
               Loading...
            </div>
         </div>
      );
   }

   return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-blue-50">
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="space-y-16">
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