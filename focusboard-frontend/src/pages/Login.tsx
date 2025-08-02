import { useEffect, useState } from "react";
import axios from "../api/axiosinstance";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { logout } from "../utils/Logout";

const API = import.meta.env.DEV ? "http://localhost:8000" : "";


  export default function Login() {
  const handleLogin = () => {
   window.location.href = `${API}/auth/google`;
  };

  return (
    <div>
      <h1>Login</h1>
      <button onClick={handleLogin}>Login with OAuth</button>
    </div>
  );
}