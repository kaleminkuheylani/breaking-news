import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// JWT secret key
const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-here";

// Twilio configuration - simplified for now
let twilioClient = null;

// 🔹 User registration
export const register = async (req, res) => {
  try {
    const { username, email, password, phoneNumber } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Bu email adresi zaten kullanılıyor" });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create new user
    const user = new User({
      username,
      email,
      passwordHash,
      phoneNumber: phoneNumber || null,
      is2FAEnabled: phoneNumber ? true : false,
    });

    await user.save();

    res.status(201).json({
      message: "Kullanıcı başarıyla oluşturuldu",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        is2FAEnabled: user.is2FAEnabled,
      },
    });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ message: "Kayıt sırasında hata oluştu", error: err.message });
  }
};

// 🔹 User login
export const login = async (req, res) => {
  try {
    const { email, password, verificationCode } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    // Check password
    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Geçersiz email veya şifre" });
    }

    // If 2FA is enabled and no verification code provided, send SMS
    if (user.is2FAEnabled && !verificationCode) {
      const code = user.generateVerificationCode();
      await user.save();

      // Send SMS (in production, you would use real Twilio credentials)
      console.log("SMS gönderilemedi (test modu):", code);
      console.log("Verification code for", user.phoneNumber, ":", code);

      return res.json({
        message: "2FA doğrulama kodu gönderildi",
        requires2FA: true,
        phoneNumber: user.phoneNumber ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1***$3") : null
      });
    }

    // If 2FA is enabled and verification code provided, verify it
    if (user.is2FAEnabled && verificationCode) {
      if (!user.isValidVerificationCode(verificationCode)) {
        return res.status(401).json({ message: "Geçersiz doğrulama kodu" });
      }
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.json({
      message: "Giriş başarılı",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Giriş sırasında hata oluştu", error: err.message });
  }
};

// 🔹 Verify token middleware
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: "Token bulunamadı" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    console.error("Token verification error:", err);
    res.status(401).json({ message: "Geçersiz token" });
  }
};

// 🔹 Resend 2FA verification code
export const resendVerificationCode = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }

    if (!user.is2FAEnabled) {
      return res.status(400).json({ message: "2FA bu kullanıcı için etkin değil" });
    }

    const code = user.generateVerificationCode();
    await user.save();

    // Send SMS
    console.log("SMS gönderilemedi (test modu):", code);
    console.log("Resend verification code for", user.phoneNumber, ":", code);

    res.json({
      message: "Yeni doğrulama kodu gönderildi",
      phoneNumber: user.phoneNumber ? user.phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1***$3") : null
    });
  } catch (err) {
    console.error("Resend verification code error:", err);
    res.status(500).json({ message: "Doğrulama kodu gönderilirken hata oluştu", error: err.message });
  }
};

// 🔹 Check if user is authorized to post (only sniper589123123@gmail.com)
export const checkPostPermission = async (req, res, next) => {
  try {
    const authorizedEmail = "sniper589123123@gmail.com";
    
    if (req.user.email !== authorizedEmail) {
      return res.status(403).json({ 
        message: "Bu işlem için yetkiniz yok. Sadece yetkili kullanıcılar yeni içerik ekleyebilir." 
      });
    }
    
    next();
  } catch (err) {
    console.error("Permission check error:", err);
    res.status(500).json({ message: "Yetki kontrolü sırasında hata oluştu" });
  }
};
