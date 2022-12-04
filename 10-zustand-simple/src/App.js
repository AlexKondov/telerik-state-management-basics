import usePassword from "./usePassword";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Input />
      <HintMessage />
      <Button />
    </div>
  );
}

function Input() {
  const { password, setPassword } = usePassword((state) => ({
    password: state.password,
    setPassword: state.setPassword,
  }));

  const onChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <div>
      <label>Password</label>
      <input type="password" value={password} onChange={onChange} />
    </div>
  );
}

function HintMessage() {
  const password = usePassword((state) => state.password);

  return (
    <p>
      {password.length >= 8
        ? "Password is safe."
        : "Password must be at least 8 characters long."}
    </p>
  );
}

function Button() {
  const password = usePassword((state) => state.password);

  return <button disabled={password.length < 8}>Update</button>;
}
