import { Outlet} from "react-router-dom";

import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

const GuestLayout = () => {

  return (
    <>
      <div className="layout-container">
        <AppHeader />
        <main className="layout-content">
        <Outlet />
        </main>
        <AppFooter />
      </div>
    </>
  );
};

export default GuestLayout;
