import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customer from "./pages/customer/Customer";
import Home from "./pages/home/Home";
import Navbar from "./layouts/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customer-data" element={<Customer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
