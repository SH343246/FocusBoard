import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      console.log("success", token);
    }
  }, []);

  return <div>dashboard</div>;
}