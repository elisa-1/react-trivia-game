import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ModalProvider } from "./modalContext/ModalContext";
import { AuthContextProvider } from "./authContext/AuthContext";
import Home from "./pages/Home";
import Game from "./pages/Game";
import Header from "./components/Header/Header";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <Router>
      <AuthContextProvider>
        <ModalProvider>
          <Header />
          <Routes>
            <Route index element={<Home />} />
            <Route path="/game/:category" element={<Game />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </ModalProvider>
      </AuthContextProvider>
    </Router>
  );
}

export default App;
