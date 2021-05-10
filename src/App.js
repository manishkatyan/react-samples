import ToDo from "./components/todo/todo";
import Pagination from "./components/pagination/pagination";
import PaginationToDo from "./components/pagination/paginationToDo";
import NavBar from "./components/navbar";
import Like from "./components/like";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
  console.log(process.env);
  return (
    <>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/like">
            <Like like="5" dislike="4" />
          </Route>
          <Route path="/todo" component={ToDo}></Route>
          <Route path="/pagination" component={Pagination}></Route>
          <Route path="/paginationToDo" component={PaginationToDo}></Route>
          <Redirect from="/" exact to="/like" />
        </Switch>
      </main>
    </>
  );
}

export default App;
