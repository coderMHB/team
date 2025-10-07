import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import Navbar from "./components/Navbar";
import Toasts from "./components/Toasts";

export default function App() {
  return (
    <BrowserRouter basename="/team">
      <Navbar />
      <Toasts />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}
