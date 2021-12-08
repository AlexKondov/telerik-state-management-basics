import { useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState({ name: "John" });
  return (
    <div className="App">
      <Dashboard>
        <DashboardHeader />
        <DashboardContent>
          <WelcomeMessage user={user} />
        </DashboardContent>
      </Dashboard>
    </div>
  );
}

function Dashboard({ children }) {
  return (
    <div>
      Dashboard
      {children}
    </div>
  );
}

function DashboardHeader() {
  return <header>Dashboard Header</header>;
}

function DashboardContent({ children }) {
  return (
    <main>
      Dashboard Content
      {children}
    </main>
  );
}

function WelcomeMessage({ user }) {
  return <h1>Welcome, {user.name}!</h1>;
}
