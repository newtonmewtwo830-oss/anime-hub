import Home from "./pages/Home";
import AddAnime from "./pages/AddAnime";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAnime />} />
      </Routes>
    </Router>
  );
}
