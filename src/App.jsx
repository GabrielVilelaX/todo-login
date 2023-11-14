import { useState } from "react";
import "./App.css";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Welcome from "./components/todo/Welcome";
import Header from "./components/header/Header";

const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [users, setUsers] = useState([]);

  function registerHandler() {
    setIsRegistering(true);
  }

  function loginHandler() {
    setIsLoggedIn(!isLoggedIn);
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
    <>
      <Header isLoggedIn={isLoggedIn} onLogOut={loginHandler} />
      <div className="container">
        {!isLoggedIn && !isRegistering && (
          <Login
            onLogin={loginHandler}
            onRegister={registerHandler}
            users={users}
            onCheck={checkUserHandler}
          />
        )}

        {!isLoggedIn && isRegistering && (
          <Register onAddUsers={addUserHandler} existingUsers={existingUsers} />
        )}

        {isLoggedIn && !isRegistering && <Welcome />}
      </div>
    </>
  );
}

export default App;
