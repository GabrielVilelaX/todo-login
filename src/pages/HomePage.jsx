import Button from "../components/Button";

function HomePage() {
  return (
    <div>
      <h1>HOMEPAGE</h1>

      <Button value="/login">Login</Button>
      <Button value="/register">Register</Button>
    </div>
  );
}

export default HomePage;
