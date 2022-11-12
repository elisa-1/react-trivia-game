import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "./modalContext/ModalContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Header from "./components/Header/Header";

function App() {
  return (
    <ModalProvider>
      <Router>
        <Header />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/game/:category" element={<Game />} />
        </Routes>
      </Router>
    </ModalProvider>
  );
}

export default App;
