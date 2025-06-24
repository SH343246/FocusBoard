import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HabitList from "./features/habits/Habitlist";
import './App.css'

function App() {
  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-2xl font-bold mb-4">My Habits</h1>
      <HabitList />
    </div>
  );
}

export default App;


