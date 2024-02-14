import { useState } from "react";
import Input from "../components/Input";
import { useUser } from "../components/context/UserContext";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const { login } = useUser();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  function clickHandler() {
    console.log(username);
    console.log(password);
    login({ username, password });
    navigate("/welcome");
  }

  return (
    <>
      <div className={styles.group}>
        <h1>LOGIN</h1>
        <Input setInput={setUsername}>Username</Input>
        <Input setInput={setPassword}>Password</Input>
      </div>
      <button onClick={clickHandler}>Log In</button>
    </>
  );
}

export default Login;
