import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    if (token) {
      localStorage.setItem("access_token", token);
      navigate("/dashboard"); 
    } else {
      console.error("token issue");
      navigate("/login"); 
    }
  }, [navigate]);
  return <p>Redirecting...</p>;
}
