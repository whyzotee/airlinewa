// import { useState } from "react";
// import logo from "/logo.jpg";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import CheckOut from "./pages/checkout";
import Payment from "./pages/payment";

function App() {
  // const [isOpen, setIsOpen] = useState(false);
  // const handleClick = () => setIsOpen(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/payment" element={<Payment />} />
        {/* 
        <Route path="/search-results" element={<SearchResults />} />
       
        <Route path="/booking" element={<Booking />} />
        <Route path="/confirmation" element={<Confirmation />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
