import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GuestLayout from "./layouts/GuestLayout";
import Shoes from "./pages/Shoes";

function App() {

  return (
    <>

      <h1 className="text-center">L8CD e-commerce per le scarpe</h1>

      <BrowserRouter>
        <Routes>
          <Route>
              <Route element={<GuestLayout/>}>
                {/* <Route path="/" element={<Home/>} /> */}
              </Route>
              <Route path="/shoes" element={< Shoes />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
