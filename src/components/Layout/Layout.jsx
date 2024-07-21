import React, { useState, useEffect } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import "./Layout.scss";

const Layout = ({ children, pageTitle, additionalInfo }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animateSidebar, setAnimateSidebar] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const hasAnimated = sessionStorage.getItem("sidebarAnimated");

    if (!hasAnimated) {
      setAnimateSidebar(true);
      sessionStorage.setItem("sidebarAnimated", "true");
      setTimeout(() => {
        setAnimateSidebar(false);
        setIsSidebarOpen(true);
      }, 2000); // Adjust the time for how long the animation should take
    } else {
      setIsSidebarOpen(true);
    }
  }, []);

  return (
    <div
      className={`app ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"} ${
        animateSidebar ? "animate-sidebar" : ""
      }`}
    >
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <div className="main-container">
        <div className="header-area">
          <Header
            isSidebarOpen={isSidebarOpen}
            pageTitle={pageTitle}
            additionalInfo={additionalInfo}
            userName="User Name"
            onToggleSidebar={toggleSidebar}
          />
        </div>
        <div className="content-container">
          <div className="main-content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
