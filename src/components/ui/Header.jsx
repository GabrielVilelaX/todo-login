import { useNavigate } from "react-router-dom";
import Button from "../Button";
import supabase from "../../services/supabase";
import { toast } from "react-toastify";

function Header({ logged, setLogged }) {
  const navigate = useNavigate();
  const user = supabase.auth.user && supabase.auth.user();

  console.log(user);

  async function logoutHandler() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(`Error signing out: ${error.message}`);
      } else {
        toast.success("Welcome back anytime!");
        localStorage.removeItem("supabaseToken");
        setLogged();
        navigate("/");
      }
    } catch (error) {
      console.error("Unexpected error:", error.message);
      toast.error(`Unexpected error: ${error.message}`);
    }
  }

  return (
    <header className="border-b-2 border-black bg-slate-200 p-4">
      <h1
        className="flex cursor-pointer justify-center text-4xl font-bold"
        onClick={() => navigate("/")}
      >
        JUST ANOTHER TO DO LIST
      </h1>
      {!logged && !user ? (
        <div className="flex justify-end space-x-2">
          <Button onClick={() => navigate("/login")}>Log In</Button>
          <Button onClick={() => navigate("/register")}>Register</Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <Button onClick={() => logoutHandler()}>Log Out</Button>
        </div>
      )}
    </header>
  );
}

export default Header;
