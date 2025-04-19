import { Outlet } from "react-router";
import NgoSidebar from "./NgoSidebar";

function NgoLayout() {
  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      <NgoSidebar />
      <Outlet />
    </div>
  );
}

export default NgoLayout;
