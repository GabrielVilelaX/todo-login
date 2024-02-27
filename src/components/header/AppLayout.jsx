import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout({ logged, setLogged }) {
  return (
    <div className="flex h-screen flex-col bg-slate-300">
      <Header logged={logged} setLogged={setLogged} />
      <main>
        <div className="border-r-3 mx-auto mt-40 flex w-2/4 flex-1 flex-col items-center rounded border border-x-2 border-black bg-slate-200 p-4">
          <Outlet></Outlet>
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
