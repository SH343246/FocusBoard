// src/pages/Dashboard.tsx

import { useEffect, useState } from "react";
import { fetchWithAuth } from "../utils/fetchWithAuth";
import { logout } from "../utils/Logout";
import.meta.env.VITE_API_BASE_URL

import { useTodos } from "../features/todo/Usetodo";
import TodoList from "../features/todo/Todolist";
import EnabledWidgets from "../features/widget/Enabledwidgets";
import ChangeTabs from "../features/habits/Changetabs";

import { CardWrapper } from "@/components/cardwrapper";
import { ListTodo, LayoutGrid, Repeat } from "lucide-react";
import api from "../api/axiosinstance";

export default function Dashboard() {
  const [userData, setUserData] = useState<{ id: number; email: string } | null>(null);
  const { data: todos } = useTodos();

  useEffect(() => {
    api.get("/me")
     .then((r) => setUserData(r.data))
     .catch(console.error);
  }, []);

  return (
    <main className="px-6 py-8 w-full">
      <div className="w-full max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">Dashboard</h1>
        <button
          onClick={logout}
          className="block mx-auto mb-6 bg-red-500 text-black px-4 py-2 rounded"
        >
          Logout
        </button>
        {userData && (
          <p className="text-center mb-6 text-sm">
            Email: {userData.email} 
          </p>
        )}

        <div className="flex flex-col lg:flex-row gap-6 w-full">
          <aside className="lg:w-80 w-full shrink-0 flex flex-col space-y-4">
            <CardWrapper title="Todos" icon={ListTodo}>
              <TodoList />
            </CardWrapper>
          </aside>

          <aside className="lg:w-80 w-full shrink-0 flex flex-col space-y-4">
            <CardWrapper title="Habits" icon={Repeat}>
              <ChangeTabs />
            </CardWrapper>
          </aside>

<section className="flex-1">
  <CardWrapper title="Widgets" icon={LayoutGrid}>
    <EnabledWidgets />
  </CardWrapper>
</section>

        </div>
      </div>
    </main>
  );
}
