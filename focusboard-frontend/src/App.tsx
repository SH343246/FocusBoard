import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HabitList from "./features/habits/Habitlist";
import './App.css'
import Navbar from "./components/NavigationBar";
import Layout from "./components/Layout";


function App() {
  return (
    <>
      <Navbar />
      <Layout>
        <h1 className="text-2xl font-bold mb-4">My Habits</h1>
        <HabitList />
      </Layout>
    </>
  );
}

export default App;


