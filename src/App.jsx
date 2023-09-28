import React, { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Welcome from "./components/todo/Welcome";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([]);

  function registerHandler() {
    setIsRegistering(true);
  }

  function loginHandler() {
    setIsLoggedIn(true);
  }

  function addUserHandler(newUser) {
    setUsers((prevUsers) => [...prevUsers, newUser]);
    setIsRegistering(false);
  }

  function checkUserHandler(username, password) {
    return users.some(
      (user) => user.username === username && user.password === password
    );
  }

  return (
    <React.Fragment>
      <header>
        <h1>TO DO LIST</h1>
      </header>
      <div className="container">
        {!isLoggedIn && !isRegistering && (
          <Login
            onLogin={loginHandler}
            onRegister={registerHandler}
            users={users}
            onCheck={checkUserHandler}
          ></Login>
        )}
        {!isLoggedIn && isRegistering && (
          <Register onAddUsers={addUserHandler}></Register>
        )}
        {isLoggedIn && !isRegistering && <Welcome></Welcome>}
      </div>
    </React.Fragment>
  );
}

export default App;
