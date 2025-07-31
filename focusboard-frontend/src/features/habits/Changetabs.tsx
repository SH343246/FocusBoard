import { use, useState } from "react";
import { createHabit } from "./Habitservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import  HabitList from "./Habitlist";
import CreateHabitForm from "./Createhabitform";


export type Filter = 'all' | 'active' | 'completed';

export default function ChangeTabs(){
  const [Tab, setTab] = useState<Filter>('all');
return (
  <>
  <div className="flex space-x-2">
        <button
          onClick={() => setTab("all")}
          className={`px-3 py-1 rounded-md ${Tab === "all" ? "bg-blue-500 text-black" : "bg-gray-200"}`}
        >
          All Habits
        </button>
        <button
          onClick={() => setTab("active")}
          className={`px-3 py-1 rounded-md ${Tab === "active" ? "bg-blue-500 text-black" : "bg-gray-200"}`}
        >
          Active Habits
        </button>
        <button
          onClick={() => setTab("completed")}
          className={`px-3 py-1 rounded-md ${Tab === "completed" ? "bg-blue-500 text-black" : "bg-gray-200"}`}
        >
          Completed Habits
        </button>
      </div>
<div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
   <CreateHabitForm />   
    <HabitList filter = {Tab}/>        
 </div>

  <div className="mt-4">
  </div>
 
      {Tab === 'active' && <p></p>}
      {Tab === 'completed' && <p></p>}
    </>
  );
}



