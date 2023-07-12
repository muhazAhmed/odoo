import { BrowserRouter, Route, Routes } from "react-router-dom";
import JobEntryData from "./pages/job-Entry-Data/JobEntryData";
import Home from "./pages/home/Home";
import Navbar from "./layouts/Navbar/Navbar";
// import CaseOnHold from "./pages/CaseOnHold/CaseOnHold";
// import SaleOrder from "./pages/SaleOrder/SaleOrder";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/job-Entry-Data" element={<JobEntryData />} />

          {/* ========== Under Development ================= */}
          
          {/* <Route path="/case-on-hold" element={<CaseOnHold />} />
          <Route path="/sale-order" element={<SaleOrder />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
