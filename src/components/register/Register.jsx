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

Register.propTypes = {
  onAddUsers: PropTypes.func.isRequired,
};

export default Register;
