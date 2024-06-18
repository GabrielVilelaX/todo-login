import { QueryClient, QueryClientProvider } from "react-query";

import List from "./List";
import Archive from "./Archive";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";

function Welcome() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={new QueryClient()}>
        <Routes>
          <Route index element={<List />} />
          <Route path="archive" element={<Archive />} />
        </Routes>
      </QueryClientProvider>
    </>
  );
}

export default Welcome;
