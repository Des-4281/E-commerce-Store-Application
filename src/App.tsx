import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => (
  <>
    <NavBar />
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </>
);

export default App;
