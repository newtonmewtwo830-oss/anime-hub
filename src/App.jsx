import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddAnime from "./pages/AddAnime";
import Watch from "./pages/Watch"; // <-- YOU MISSED THIS LINE

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddAnime />} />
        <Route path="/watch" element={<Watch />} />
      </Routes>
    </BrowserRouter>
  );
}
