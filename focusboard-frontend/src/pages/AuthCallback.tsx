import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    const refreshToken = urlParams.get("refresh_token");    

    if (accessToken && refreshToken) {
      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      window.history.replaceState({}, document.title, "/dashboard");
      navigate("/dashboard", { replace: true });
    } else if (window.location.pathname === "/auth/callback") {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Redirecting...</p>;
}
