import { useState, createContext, useContext } from "react";
import "./App.css";

const UserContext = createContext({ name: "" });

const UserProvider = function ({ children }) {
  const [user, setUser] = useState({ name: "John" });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  const { user, setUser } = useContext(UserContext);
  return { user, setUserName: (name) => setUser({ name }) };
}

export default function App() {
  return (
    <UserProvider>
      <div className="App">
        <Dashboard />
      </div>
    </UserProvider>
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
  const { setUserName } = useUserContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    setUserName(e.target[0].value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="User Name" />
      <button>Update</button>
    </form>
  );
}

function WelcomeMessage() {
  const { user } = useUserContext();
  return <h1>Welcome, {user.name}!</h1>;
}
