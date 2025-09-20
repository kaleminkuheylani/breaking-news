import React from "react";
import AuthWrapper from "./AuthWrapper";

const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <div
      style={{
        width: "300px",
        minHeight: "100vh",
        backgroundColor: "#343a40",
        color: "white",
        padding: "1rem",
        borderRight: "2px solid #212529",
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 1000,
        transition: "transform 0.3s ease-in-out",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
      }}
    >
      <button
        onClick={toggleSidebar}
        style={{
          position: "absolute",
          bottom: "350px",
          right: "-40px",
          backgroundColor: "blue",
          border: "none",
          borderRadius: "50%",
          cursor: "pointer",
          width: "32px",
          height: "32px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
        aria-label="Toggle sidebar"
      >
        {isOpen ? "←" : "→"}
      </button>

      <AuthWrapper />
    </div>
  );
};

export default Sidebar;
