import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Input from "../components/Input";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const { user, error } = await supabase.auth.signUp({
        email: username, // Supondo que o nome de usuário é o endereço de e-mail
        password: password,
      });

      if (error) {
        console.error("Error registering user:", error.message);
      } else {
        await supabase
          .from("lists")
          .insert([{ user_id: user.id, title: "My List", tasks: [] }]);
        toast.success("User registered successfully:", user);
        navigate("/login");
      }
    } catch (error) {
      toast.error("Unexpected error:", error.message);
    }
  };

  return (
    <>
      <h1>Register</h1>
      <Input setInput={setUsername}>Username</Input>
      <Input setInput={setPassword} type="password">
        Password
      </Input>

      <button onClick={handleRegister}>Register</button>
    </>
  );
}

export default Register;
