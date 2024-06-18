import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Welcome from "./pages/Welcome";
import HomePage from "./pages/HomePage";
import { ToastContainer } from "react-toastify";

import AppLayout from "./components/ui/AppLayout";
import { useState } from "react";
import ErrorNotFound from "./pages/ErrorNotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  const [logged, setLogged] = useState(false);
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <ToastContainer />
        <BrowserRouter>
          <Routes>
            <Route
              element={
                <AppLayout logged={logged} setLogged={() => setLogged(false)} />
              }
            >
              <Route index element={<HomePage />}></Route>
              <Route
                path="login"
                element={<Login setLogged={() => setLogged(true)} />}
              ></Route>
              <Route path="register" element={<Register />}></Route>
              <Route path="welcome/*" element={<Welcome />}></Route>
              <Route path="*" element={<ErrorNotFound />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
