import "./css/App.css";
import Favorites from "./pages/Favorites";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import { MovieProvider } from "./Context/MovieContext";
import { SkeletonTheme } from "react-loading-skeleton";

function App() {
  return (
    <MovieProvider>
      <Navbar />
      <SkeletonTheme baseColor="#313131" highlightColor="#525252">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </SkeletonTheme>
    </MovieProvider>
  );
}

export default App;
