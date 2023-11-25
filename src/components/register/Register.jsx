import { useState } from "react";

import "../login/Login.css";

function Register({ onAddUsers, existingUsers }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (password === password2) {
      const user = {
        username: username,
        password: password,
      };

      existingUsers.push(user);

      localStorage.setItem("users", JSON.stringify(existingUsers));

      setUsername("");
      setPassword("");
      setPassword2("");
      onAddUsers(user);
    } else {
      return;
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="group">
          <label>Username</label>
          <input
            className="input"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
        </div>

        <div className="group">
          <label>Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>

        <div className="group">
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
          ></input>
        </div>

        <div className="group">
          <button type="submit" className="button">
            Register
          </button>
        </div>
      </form>
    </>
  );
}

export default Register;
