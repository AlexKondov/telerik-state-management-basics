import { useReducer } from "react";
import "./App.css";

const initialState = {
  books: [],
  fields: {
    name: "",
    author: "",
  },
};

function reducer(state, action) {
  switch (action.type) {
    case "update-field":
      return { ...state, fields: { [action.field]: action.value } };
    case "add-book":
      return {
        ...state,
        fields: {
          name: "",
          author: "",
        },
        books: [
          ...state.books,
          { name: state.fields.name, author: state.fields.author },
        ],
      };
    case "remove-book":
      return {
        ...state,
        books: state.books.filter((book) => book.name !== action.name),
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <div className="Books">
        {state.books.map((book) => (
          <div>
            <h4>{book.name}</h4>
            <h5>{book.author}</h5>
            <button
              onClick={() => dispatch({ type: "remove-book", name: book.name })}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <form>
        <input
          value={state.name}
          onChange={(e) =>
            dispatch({
              type: "update-field",
              field: "name",
              value: e.target.value,
            })
          }
          placeholder="Name"
        />
        <input
          value={state.author}
          onChange={(e) => {
            dispatch({
              type: "update-field",
              field: "author",
              value: e.target.value,
            });
          }}
          placeholder="Author"
        />
        <button type="button" onClick={() => dispatch({ type: "add-book" })}>
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
