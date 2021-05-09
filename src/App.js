import ToDo from "./components/todo/todo";
import Pagination from "./components/pagination/pagination";
import Like from "./components/like";
import React from "react";
import "./App.css";

function App() {
  console.log(process.env);
  return (
    <div className="App">
      <div style={{ color: "#999999" }}>{process.env.REACT_APP_NAME}</div>
      <Like like="5" dislike="4" />
      <ToDo />
      <Pagination />
    </div>
  );
}

export default App;
