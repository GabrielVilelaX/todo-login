import { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../services/supabase";
import Input from "../components/Input";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (password === confirmPassword) {
      try {
        const { user, error } = await supabase.auth.signUp({
          email: username,
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
    } else {
      toast.error("Senha não compativeis");
    }
  };

  return (
    <>
      <Input setInput={setUsername}>Username</Input>
      <Input setInput={setPassword} type="password">
        Password
      </Input>
      <Input setInput={setConfirmPassword} type="password">
        Confirm Password
      </Input>

      <button
        className="mt-3 rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100"
        onClick={handleRegister}
      >
        Register
      </button>
    </>
  );
}

export default Register;
