import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Shoes from "./pages/Shoes";
import Home from "./pages/Home"

function App() {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route>
              <Route element={<GuestLayout/>}>
                <Route path="/" element={<Home/>} />
                <Route path="/shoes" element={< Shoes />} />
              </Route>
              
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
