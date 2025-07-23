import { useEffect, useState } from "react";
import axios from "../api/axiosinstance";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { logout } from "../utils/Logout";


  export default function Login() {
  const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google"; 
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
}