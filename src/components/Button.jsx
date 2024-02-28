import { useNavigate } from "react-router-dom";

function Button({ children, value, log }) {
  const navigate = useNavigate();

  function clickHandler(e) {
    e.preventDefault();
    console.log(value);
    navigate(`${value}`);
  }

  return (
    <button
      className="rounded border-2 border-black bg-slate-300 p-1 px-4 font-semibold hover:bg-slate-100 "
      onClick={clickHandler}
    >
      {children}
    </button>
  );
}

export default Button;
