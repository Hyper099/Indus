import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import MainContent from "./MainContent";

const MainPage = () => {
   return (
      <div className="App d-flex flex-column min-vh-100">
         <MainContent />
         <Footer />
      </div>
   );
};

export default MainPage;
