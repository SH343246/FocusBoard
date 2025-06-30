import { use, useState } from "react";
import { createHabit } from "./Habitservice";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function ChangeTabs(){
  const [Tab, setTab] = useState<'all' | 'active' | 'completed'>('all');
return (
  <>
  <button 
    onClick={() => setTab('all')
      className={`px-4 py-2 rounded ${Tab === 'all' ? 'bg-blue-500 text-white active' : 'bg-gray-200 text-gray-800 undefined'}`}
  >
    All Habits
  </button>
    
<button 
    onClick={() => setTab('active')}
      className={`px-4 py-2 rounded ${Tab === 'active' ? 'bg-blue-500 text-white active' : 'bg-gray-200 text-gray-800 undefined'}`}
  >
    Active Habits
  </button> 

<button 
    onClick={() => setTab('completed')}
      className={`px-4 py-2 rounded ${Tab === 'completed' ? 'bg-blue-500 text-white active' : 'bg-gray-200 text-gray-800 undefined'}`}
  >
    Completed Habits
  </button>

   {Tab === 'all' && <p>All items…</p>}
      {Tab === 'active' && <p>Only active items…</p>}
      {Tab === 'completed' && <p>Done and dusted…</p>}
    </>
  );
}



