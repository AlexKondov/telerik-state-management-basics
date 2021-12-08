import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState({ name: "John" });
  return (
    <div className="App">
      <Dashboard user={user} />
    </div>
  );
}

function Dashboard({ user }) {
  return (
    <div>
      Dashboard
      <DashboardHeader />
      <DashboardContent user={user} />
    </div>
  );
}

function DashboardHeader() {
  return <header>Dashboard Header</header>;
}

function DashboardContent({ user }) {
  return (
    <main>
      Dashboard Content
      <WelcomeMessage user={user} />
    </main>
  );
}

function WelcomeMessage({ user }) {
  return <h1>Welcome, {user.name}!</h1>;
}
