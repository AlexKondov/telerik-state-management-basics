import { useState, createContext, useContext } from "react";
import "./App.css";

const UserContext = createContext({ name: "" });

export default function App() {
  const [user, setUser] = useState({ name: "Alex" });
  return (
    <UserContext.Provider value={{ user, setUser }}>
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
      <UserForm />
    </main>
  );
}

function UserForm() {
  const { user, setUser } = useContext(UserContext);

  const handleChange = (e) => {
    setUser({ name: e.target.value });
  };

  return (
    <div>
      <input name="User Name" value={user.name} onChange={handleChange} />
    </div>
  );
}

function WelcomeMessage() {
  const { user } = useContext(UserContext);
  return <h1>Welcome, {user.name}!</h1>;
}
