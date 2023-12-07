import { useNavigate } from "react-router-dom";

function Button({ children, value }) {
  const navigate = useNavigate();

  function clickHandler(e) {
    e.preventDefault();
    console.log(value);
    navigate(`${value}`);
  }

  return <button onClick={clickHandler}>{children}</button>;
}

export default Button;
