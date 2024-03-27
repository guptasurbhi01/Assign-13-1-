import React, { useState, useReducer } from "react";
import "./App.css";

const textReducer = (state, action) => {
  switch (action.type) {
    case "SET_TEXT":
      return { ...state, text: action.payload };
    case "UPPERCASE":
      return { ...state, text: state.text.toUpperCase() };
    case "LOWERCASE":
      return { ...state, text: state.text.toLowerCase() };
    case "CLEAR":
      return { ...state, text: "" };
    case "REMOVE_EXTRA_SPACES":
      return { ...state, text: state.text.replace(/\s+/g, " ").trim() }; 
    default:
      return state;
  }
};

const App = () => {
  const [theme, setTheme] = useState("light");
  const [state, dispatch] = useReducer(textReducer, { text: "" });

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleTextChange = (e) => {
    dispatch({ type: "SET_TEXT", payload: e.target.value });
  };

  const wordCount = state.text.trim().split(/\s+/).length;
  const charCount = state.text.length;
  const readingTime = Math.ceil(wordCount / 200);

  return (
    <div className={`app ${theme === "dark" ? "dark-theme" : "light-theme"}`}>
      <div className="header">
        <h1>Text Editor</h1>
        <button onClick={toggleTheme}>Toggle Theme</button>
      </div>
      <div className="editor">
        <textarea
          value={state.text}
          onChange={handleTextChange}
          placeholder="Type your text here..."
        ></textarea>
        <div className="stats">
          <p>Word Count: {wordCount}</p>
          <p>Character Count: {charCount}</p>
          <p>Reading Time: {readingTime} min</p>
        </div>
      </div>
      <div className="actions">
        <button onClick={() => dispatch({ type: "UPPERCASE" })}>
          Uppercase
        </button>
        <button onClick={() => dispatch({ type: "LOWERCASE" })}>
          Lowercase
        </button>
        <button onClick={() => dispatch({ type: "CLEAR" })}>Clear Text</button>
        <button onClick={() => dispatch({ type: "REMOVE_EXTRA_SPACES" })}>
          Remove Extra Spaces
        </button>
        <button onClick={() => navigator.clipboard.writeText(state.text)}>
          Copy To Clipboard
        </button>
      </div>
      <div className="preview">
        <h2>Preview</h2>
        <p>{state.text}</p>
      </div>
    </div>
  );
};

export default App;
