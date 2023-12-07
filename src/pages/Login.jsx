import Input from "../components/Input";
import { useUser } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { login, updateUser, username, password } = useUser();

  function clickHandler() {
    const logUser = {
      username,
      password,
    };
    login(logUser);
    navigate("/welcome");
  }

  return (
    <>
      <h1>LOGIN</h1>
      <Input setInput={(value) => updateUser({ username: value, password })}>
        Username
      </Input>
      <Input setInput={(value) => updateUser({ username, password: value })}>
        Password
      </Input>
      <button onClick={clickHandler}>oi</button>
    </>
  );
}

export default Login;
