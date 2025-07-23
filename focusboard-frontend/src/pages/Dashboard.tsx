import { useEffect, useState } from "react";
import axios from "../api/axiosinstance";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { logout } from "../utils/Logout";
import {useTodos} from "../features/todo/Usetodo";
import TodoList from "../features/todo/Todolist";


export default function Dashboard() {
const [userData, setUserData] = useState<{ id: number; email: string } | null>(null);
  useEffect(() => {
    fetchWithAuth("http://localhost:8000/me")
      .then((res: Response) => res.json())
      .then(data => setUserData(data))
      .catch((err: any) => {
        console.error("Auth failed:", err);
      });
  }, []);

  const { data: todos, isLoading, error } = useTodos();
  console.log("Todos:", todos);



  return (
    <div>
      <h1>Dashboard</h1>
       <button onClick={logout}>Logout</button>
      {userData ? (
        <pre>Email: {userData.email} (User ID: {userData.id})</pre>
      ) : (
        <p>Loading user info...</p>
      )}
    <TodoList /> 
    </div>
  );
}