import { useState } from "react";
import PropTypes from "prop-types";

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
        <label>Username</label>
        <input onChange={usernameHandler}></input>
        <label>Password</label>
        <input onChange={passwordHandler}></input>
        <label>Confirm Password</label>
        <input onChange={passwordHandler2}></input>
        <button type="submit">Register</button>
      </form>
    </>
  );
}

Register.propTypes = {
  onAddUsers: PropTypes.func.isRequired,
};

export default Register;
