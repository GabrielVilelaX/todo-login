import { useState } from "react";
import Input from "../components/Input";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../components/Button";

function Login({ setLogged }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const { user, error } = await supabase.auth.signInWithPassword({
        email: username,
        password: password,
      });

      if (error) {
        console.error("Error signing in:", error.message);
        toast.error(`Error signing in: ${error.message}`);
      } else {
        toast.success("Welcome:", user);

        setLogged();
        navigate("/welcome");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error(`Unexpected error: ${error.message}`);
    }
  };

  return (
    <>
      <ToastContainer />
      <Input setInput={setUsername}>Username</Input>
      <Input setInput={setPassword} type="password">
        Password
      </Input>

      <Button
        className="mx-auto mt-5 max-w-40 items-center rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100"
        onClick={() => handleLogin()}
      >
        Log In
      </Button>
    </>
  );
}

export default Login;
