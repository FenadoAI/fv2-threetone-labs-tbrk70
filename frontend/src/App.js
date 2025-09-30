import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Threetone from "./pages/Threetone";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Threetone />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
