import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem("token"),
  isAuthenticated: false,

  // Login function
  login: async (email, password, verificationCode = null) => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, verificationCode }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Giriş başarısız");
      }

      const data = await res.json();
      
      // If 2FA is required, return the 2FA info
      if (data.requires2FA) {
        return { 
          success: false, 
          requires2FA: true, 
          message: data.message,
          phoneNumber: data.phoneNumber 
        };
      }
      
      // Store token and user data
      localStorage.setItem("token", data.token);
      set({ 
        user: data.user, 
        token: data.token, 
        isAuthenticated: true 
      });

      return { success: true, message: data.message };
    } catch (err) {
      console.error("Login error:", err);
      return { success: false, message: err.message };
    }
  },

  // Resend verification code
  resendVerificationCode: async (email) => {
    try {
      const res = await fetch("http://localhost:5000/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Kod gönderilemedi");
      }

      const data = await res.json();
      return { success: true, message: data.message, phoneNumber: data.phoneNumber };
    } catch (err) {
      console.error("Resend verification error:", err);
      return { success: false, message: err.message };
    }
  },

  // Logout function
  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, isAuthenticated: false });
  },

  // Check if user is authorized to post
  canPost: () => {
    const { user } = get();
    return user && user.email === "sniper589123123@gmail.com";
  },

  // Initialize auth state from localStorage
  initializeAuth: () => {
    const token = localStorage.getItem("token");
    if (token) {
      // You could verify the token here if needed
      set({ token, isAuthenticated: true });
    }
  },
}));

export default useAuthStore;
