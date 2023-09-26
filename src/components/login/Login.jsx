import PropTypes from "prop-types";
import { useState } from "react";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register(e) {
    e.preventDefault();
    props.onRegister();
  }

  function usernameHandler(event) {
    setUsername(event.target.value);
  }

  function passwordHandler(event) {
    setPassword(event.target.value);
  }

  function submitHandler(e) {
    e.preventDefault();
    const userExists = props.onCheck(username, password);

    if (userExists) {
      console.log("Login bem-sucedido!");
      props.onLogin();
    } else {
      alert("erro");
      return;
    }
  }

  return (
    <>
      <form onSubmit={submitHandler}>
        <label>Username</label>
        <input onChange={usernameHandler}></input>
        <label>Password</label>
        <input onChange={passwordHandler}></input>
        <button onClick={register}>Register</button>
        <button type="submit">Login</button>
      </form>
    </>
  );
}

Login.propTypes = {
  onRegister: PropTypes.func.isRequired,
  onCheck: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default Login;
