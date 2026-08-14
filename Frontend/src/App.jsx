import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Today from "./pages/Today";
import Calendar from "./pages/Calendar";
import Roadmaps from "./pages/Roadmaps";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Today</Link>
        {" | "}
        <Link to="/calendar">Calendar</Link>
        {" | "}
        <Link to="/roadmaps">Roadmaps</Link>
        {" | "}
        <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Today />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/roadmaps" element={<Roadmaps />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;