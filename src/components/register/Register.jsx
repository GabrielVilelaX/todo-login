import { useState } from "react";
import PropTypes from "prop-types";
import "../login/Login.css";

function Register(props) {
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
      props.onAddUsers(user);
    } else {
      return;
    }
  }

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function passwordHandler2(event) {
    setPassword2(event.target.value);
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="group">
          <label>Username</label>
          <input className="input" onChange={usernameHandler}></input>
        </div>
        <div className="group">
          <label>Password</label>
          <input
            className="input"
            type="password"
            onChange={passwordHandler}
          ></input>
        </div>
        <div className="group">
          <label>Confirm Password</label>
          <input
            className="input"
            type="password"
            onChange={passwordHandler2}
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

Register.propTypes = {
  onAddUsers: PropTypes.func.isRequired,
};

export default Register;
