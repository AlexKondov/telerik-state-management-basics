import { useContext, useReducer, createContext } from "react";
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
    case "update-address":
      return { ...state, address: action.address };
    default:
      return state;
  }
}

const UserContext = createContext({ name: "" });

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
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
  const { dispatch } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "update-name",
      name: e.target[0].value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="User Name" />
      <button>Update</button>
    </form>
  );
}

function WelcomeMessage() {
  const { state } = useContext(UserContext);
  return <h1>Welcome, {state.name}!</h1>;
}
