import { Outlet } from "react-router";
import { AppHeader } from "./partials/Header";
import { useAuthContext } from "@/contexts/authContext";
import Loader from "../loader";


const Layout = () => {
  const { isLoadingProfile } = useAuthContext();

  return (
    <div className="min-h-screen w-full  flex flex-col bg-white">
      <AppHeader />
      {isLoadingProfile && <Loader />}
      <main className="flex-1  md:p-1 w-full">
        <Outlet />
      </main>
      {/*<Footer />*/}
    </div>
  );
};

export default Layout;
