import { useState, useEffect } from "react";
import useAuthStore from "../lib/useAuthStore";
import LoginForm from "./LoginForm";
import HaberForm from "./HaberForm";

const AuthWrapper = () => {
  const { isAuthenticated, canPost, initializeAuth, logout } = useAuthStore();
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const handleLoginSuccess = () => {
    setShowLogin(false);
  };

  const handleLogout = () => {
    logout();
    setShowLogin(true);
  };

  if (!isAuthenticated || !canPost()) {
    return (
      <div>
        {showLogin ? (
          <LoginForm onLoginSuccess={handleLoginSuccess} />
        ) : (
          <div style={{ padding: "2rem", textAlign: "center" }}>
            <h3>Yetki Gerekli</h3>
            <p>Yeni haber eklemek için giriş yapmanız gerekiyor.</p>
            <button 
              onClick={() => setShowLogin(true)}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Giriş Yap
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div>
      <div style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        marginBottom: "1rem",
        padding: "1rem",
        backgroundColor: "#f8f9fa",
        borderRadius: "4px"
      }}>
        <span>Hoş geldiniz! Yeni haber ekleyebilirsiniz.</span>
        <button 
          onClick={handleLogout}
          style={{
            padding: "0.25rem 0.5rem",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer"
          }}
        >
          Çıkış Yap
        </button>
      </div>
      <HaberForm />
    </div>
  );
};

export default AuthWrapper;
