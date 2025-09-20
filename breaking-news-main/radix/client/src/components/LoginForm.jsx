import { useState } from "react";
import { Input, Button, Label, Alert } from "reactstrap";
import useAuthStore from "../lib/useAuthStore";

const LoginForm = ({ onLoginSuccess }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [requires2FA, setRequires2FA] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const login = useAuthStore((state) => state.login);
  const resendVerificationCode = useAuthStore((state) => state.resendVerificationCode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const result = await login(email, password, verificationCode);
    
    if (result.success) {
      onLoginSuccess();
    } else if (result.requires2FA) {
      setRequires2FA(true);
      setPhoneNumber(result.phoneNumber);
      setError("");
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  const handleResendCode = async () => {
    setLoading(true);
    setError("");

    const result = await resendVerificationCode(email);
    
    if (result.success) {
      setError("Yeni doğrulama kodu gönderildi");
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", padding: "2rem" }}>
      <h3 style={{ textAlign: "center", marginBottom: "2rem" }}>Giriş Yap</h3>
      
      {error && (
        <Alert color="danger" style={{ marginBottom: "1rem" }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Label for="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email adresinizi girin"
          required
        />

        <Label for="password" className="mt-2">Şifre</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifrenizi girin"
          required
        />

        {requires2FA && (
          <>
            <Label for="verificationCode" className="mt-2">
              Doğrulama Kodu
            </Label>
            <Input
              id="verificationCode"
              type="text"
              value={verificationCode}
              onChange={(e) => setVerificationCode(e.target.value)}
              placeholder="6 haneli doğrulama kodunu girin"
              maxLength="6"
              required
            />
            {phoneNumber && (
              <small className="text-muted mt-1 d-block">
                Kod {phoneNumber} numarasına gönderildi
              </small>
            )}
            <Button 
              type="button" 
              color="link" 
              className="mt-2 p-0"
              onClick={handleResendCode}
              disabled={loading}
            >
              Kodu tekrar gönder
            </Button>
          </>
        )}

        <Button 
          type="submit" 
          color="primary" 
          className="mt-3" 
          block
          disabled={loading}
        >
          {loading ? "Giriş yapılıyor..." : requires2FA ? "Doğrula ve Giriş Yap" : "Giriş Yap"}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
