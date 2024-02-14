import { useState } from "react";
import Input from "../components/Input";
import { useUser } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register } = useUser();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      const newUser = {
        username: username,
        password: password,
      };
      register(newUser);
      setUsername("");
      setPassword("");
      navigate("/");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Input setInput={setUsername}>Username</Input>
      <Input setInput={setPassword}>Password</Input>
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;
