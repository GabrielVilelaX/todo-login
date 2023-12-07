import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import { UserProvider } from "./components/context/UserContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />}></Route>
          <Route path="login" element={<Login />}></Route>
          <Route path="register" element={<Register />}></Route>
          <Route path="welcome" element={<Welcome />}></Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
