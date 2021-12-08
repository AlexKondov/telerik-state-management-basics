import { useState, createContext, useContext } from "react";
import "./App.css";

const UserContext = createContext({ name: "" });

export default function App() {
  return (
    <UserContext.Provider value={{ name: "John" }}>
      <div className="App">
        <Dashboard />
      </div>
    </UserContext.Provider>
  );
}

function Dashboard() {
  return (
    <div>
      Dashboard
      <DashboardHeader />
      <DashboardContent />
    </div>
  );
}

function DashboardHeader() {
  return <header>Dashboard Header</header>;
}

function DashboardContent() {
  return (
    <main>
      Dashboard Content
      <WelcomeMessage />
    </main>
  );
}

function WelcomeMessage() {
  const user = useContext(UserContext);
  return <h1>Welcome, {user.name}!</h1>;
}
