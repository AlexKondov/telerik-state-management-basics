import "./App.css";
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from "recoil";

const passwordState = atom({
  key: "password",
  default: "",
});

const charCountState = selector({
  key: "passwordCount",
  get: ({ get }) => {
    const text = get(passwordState);
    return text.length;
  },
});

export default function App() {
  return (
    <RecoilRoot>
      <div className="App">
        <CharacterCounter />
      </div>
    </RecoilRoot>
  );
}

function CharacterCounter() {
  return (
    <div>
      <Input />
      <HintMessage />
      <Button />
    </div>
  );
}

function Input() {
  const [text, setText] = useRecoilState(passwordState);

  const onChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div>
      <label>Password</label>
      <input type="password" value={text} onChange={onChange} />
    </div>
  );
}

function HintMessage() {
  const count = useRecoilValue(charCountState);

  return (
    <p>
      {count >= 8
        ? "Password is safe."
        : "Password must be at least 8 characters long."}
    </p>
  );
}

function Button() {
  const count = useRecoilValue(charCountState);

  return <button disabled={count < 8}>Update</button>;
}
