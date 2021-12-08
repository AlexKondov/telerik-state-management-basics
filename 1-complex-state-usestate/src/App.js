import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [author, setAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const handleSubmit = () => {
    setBooks([...books, { name, author }]);
    setName("");
    setAuthor("");
  };

  const handleDelete = (name) => {
    setBooks(books.filter((book) => book.name !== name));
  };

  return (
    <div className="App">
      <div className="Books">
        {books.map((book) => (
          <div>
            <h4>{book.name}</h4>
            <h5>{book.author}</h5>
            <button onClick={() => handleDelete(book.name)}>Delete</button>
          </div>
        ))}
      </div>
      <form>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Author"
        />
        <button type="button" onClick={handleSubmit}>
          Save
        </button>
      </form>
    </div>
  );
}

export default App;
