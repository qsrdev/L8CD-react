import { Outlet} from "react-router-dom";
import ChatBotToggle from "../components/ChatBotToggle";

import AppHeader from "../components/AppHeader";
import AppFooter from "../components/AppFooter";

const GuestLayout = () => {

  return (
    <>
      <div className="layout-container">
        <AppHeader />
        <ChatBotToggle/>
        <main className="layout-content">
        <Outlet />   
        </main>  
        <AppFooter />
      </div>
    
    </>
  );
};

export default GuestLayout;
