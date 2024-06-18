import { useNavigate } from "react-router-dom";

function ErrorNotFound() {
  const navigate = useNavigate();
  return (
    <>
      <h1>Error: Please go back to the home page</h1>
      <button onClick={() => navigate("/")}></button>
    </>
  );
}

export default ErrorNotFound;
