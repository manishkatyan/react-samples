import ToDo from "./components/todo/todo";
import Pagination from "./components/pagination/pagination";
import PaginationToDo from "./components/pagination/paginationToDo";
import NavBar from "./components/navbar";
import Like from "./components/like";
import CurrencyConverter from "./components/currencyConverter/currencyConverter";
import UnitTest from "./components/currencyConverter/unitTest";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";

function App() {
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
          <Route path="/currency" component={CurrencyConverter}></Route>
          <Route path="/unit-test" component={UnitTest}></Route>
          <Redirect from="/" exact to="/currency" />
        </Switch>
      </main>
    </>
  );
}

export default App;
