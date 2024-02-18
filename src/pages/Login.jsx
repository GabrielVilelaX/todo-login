import { useState } from "react";
import Input from "../components/Input";
import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase"; // Importe o cliente Supabase configurado
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: username, // Supondo que o nome de usuário é o endereço de e-mail
        password: password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast.error(`Error signing in: ${error.message}`);
      } else {
        toast.success("Welcome:", user);
        navigate("/welcome"); // Redirecione para a página de dashboard ou qualquer outra página desejada
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <>
      <div className={styles.group}>
        <h1>LOGIN</h1>
        <ToastContainer />
        <Input setInput={setUsername}>Username</Input>
        <Input setInput={setPassword} type="password">
          Password
        </Input>

        <button onClick={handleLogin}>Log In</button>
      </div>
    </>
  );
}

export default Login;
