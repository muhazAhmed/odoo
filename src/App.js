import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customer from "./pages/customer/Customer";

function App() {
  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Customer/>}/>
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
