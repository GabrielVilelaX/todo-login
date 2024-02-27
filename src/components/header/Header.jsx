import { useNavigate } from "react-router-dom";
import Button from "../Button";
import supabase from "../../services/supabase";
import { toast } from "react-toastify";

function Header({ logged, setLogged }) {
  const navigate = useNavigate();

  async function logoutHandler() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        toast.error(`Error signing out: ${error.message}`);
      } else {
        toast.success("Welcome back anytime!");
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
      <h1 className="flex justify-center text-4xl font-bold ">
        JUST ANOTHER TO DO LIST
      </h1>
      {!logged ? (
        <div className="flex justify-end space-x-2">
          <Button value="/login">Log In</Button>
          <Button value="/register">Register</Button>
        </div>
      ) : (
        <div className="flex justify-end">
          <button
            className="mt-3 rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100"
            onClick={logoutHandler}
          >
            Log Out
          </button>
        </div>
      )}
    </header>
  );
}

export default Header;
