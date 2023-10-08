import PropTypes from "prop-types";
import { useState } from "react";
import "./Login.css";

function Login(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function register(e) {
    e.preventDefault();
    props.onRegister();
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
          <button className="button" onClick={register}>
            Register
          </button>
          <button className="button" type="submit">
            Login
          </button>
        </div>
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
