import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import EmpList from "./components/EmpList";
import Create from "./components/Create";
import Update from "./components/Update";
import Details from "./components/Details";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<EmpList />} />
          <Route path="/create" element={<Create />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;


