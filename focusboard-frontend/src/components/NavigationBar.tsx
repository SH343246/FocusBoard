import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";

export default function NavigationBar() {
  const [email, setEmail] = useState<string | null>(null);

 useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      fetchWithAuth("http://localhost:8000/me")
        .then((res) => res.json())
        .then((data) => setEmail(data.email))
        .catch(() => setEmail(null));
    }
  }, []);

  return (
    <nav>
      <h2>FocusBoard</h2>
      {email ? (
        <p>Signed in as <strong>{email}</strong></p>
      ) : (
        <p>Not signed in</p>
      )}
    </nav>
  );
}
