import Input from "../components/Input";
import { useUser } from "../components/context/UserContext";
import { useNavigate } from "react-router-dom";

function Register() {
  const { register, updateUser, username, password } = useUser();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (username && password) {
      const newUser = { username, password };
      register(newUser);
      updateUser({ username: "", password: "" });
      navigate("/");
    } else {
      alert("Por favor, preencha todos os campos.");
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Input setInput={(value) => updateUser({ username: value, password })}>
        Username
      </Input>
      <Input setInput={(value) => updateUser({ username, password: value })}>
        Password
      </Input>
      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;
