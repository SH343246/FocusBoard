import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(" arrived at", window.location.href);
    console.log("search →", window.location.search);
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");    
    console.log("window.location.href:", window.location.href);
    console.log("window.location.search:", window.location.search);

      if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);      
      navigate("/dashboard"); 
    } else if (window.location.pathname === "/auth/callback") {
      console.warn("token is missing:", { accessToken, refreshToken });
      navigate("/login");
    }
  }, [navigate]);
  return <p>Redirecting...</p>;
}
