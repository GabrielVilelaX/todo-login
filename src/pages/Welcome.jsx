import { QueryClient, QueryClientProvider } from "react-query";

import List from "./List";
import { ToastContainer } from "react-toastify";

function Welcome() {
  return (
    <>
      <ToastContainer />
      <QueryClientProvider client={new QueryClient()}>
        <List />
      </QueryClientProvider>
    </>
  );
}

export default Welcome;
