import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import HabitList from "./features/habits/Habitlist";
import './App.css'
import Navbar from "./components/NavigationBar";
import Layout from "./components/Layout";
import CreateHabitForm from './features/habits/Createhabitform';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthCallback from "./pages/AuthCallback";


function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
      <Navbar />
      <Layout>
        <h1 className="text-2xl font-bold mb-4">My Habits</h1>
        <CreateHabitForm />
        <HabitList />
      </Layout>
    </>
  );
}

export default App;


