import { createContext, useContext, useReducer } from "react";
import "./App.css";

const initialState = {
  name: "John",
  lastName: "Doe",
  address: {
    city: "Sofia",
    country: "Bulgaria",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "update-name":
      return { ...state, name: action.name };
    case "update-lastName":
      return { ...state, lastName: action.lastName };
    case "address":
      return { ...state, address: action.address };
    default:
      return state;
  }
}

const UserContext = createContext({ name: "" });

const UserProvider = function ({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

function useUserContext() {
  const { state, dispatch } = useContext(UserContext);

  return {
    user: state,
    setUserName: (name) => dispatch({ type: "update-name", name }),
    setUserLastName: (lastName) =>
      dispatch({ type: "update-lastName", lastName }),
    setUserAddress: (address) => dispatch({ type: "update-address", address }),
  };
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
