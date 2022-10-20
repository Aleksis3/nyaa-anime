import "./App.css";
import Header from "./components/Header";
import Main from "./pages/Main/Main";
import Login from "./pages/Login/Login";
import { Routes, Route } from "react-router-dom";
import AnimeDetails from "./pages/AnimeDetails/AnimeDetails";
import Register from "./pages/Register/Register";
import AnimeList from "./pages/AnimeList/AnimeList";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/anime/:animeId" element={<AnimeDetails />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/list" element={<AnimeList />} />
      </Routes>
    </div>
  );
}

export default App;
