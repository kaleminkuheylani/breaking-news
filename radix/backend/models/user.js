import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  phoneNumber: { type: String, required: false },
  is2FAEnabled: { type: Boolean, default: false },
  twoFactorSecret: { type: String, required: false },
  verificationCode: { type: String, required: false },
  verificationCodeExpires: { type: Date, required: false },
});

// Parola doğrulama fonksiyonu
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.passwordHash);
};

// 2FA verification code generation
userSchema.methods.generateVerificationCode = function() {
  const code = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit code
  this.verificationCode = code;
  this.verificationCodeExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes
  return code;
};

// 2FA verification code validation
userSchema.methods.isValidVerificationCode = function(code) {
  if (!this.verificationCode || !this.verificationCodeExpires) {
    return false;
  }
  
  if (new Date() > this.verificationCodeExpires) {
    return false;
  }
  
  return this.verificationCode === code;
};

export default mongoose.model("User", userSchema);
