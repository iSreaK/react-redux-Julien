import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import ProductList from "./components/ProductList";
import Wishlist from "./components/Wishlist";

const App = () => {
  return (
    <Router>
      <div className=" w-full mx-auto">
      <nav className="flex justify-center py-4 border-b-2 border-gray-200 fixed top-0 left-0 right-0 bg-white z-10">
        <Link
          className="mx-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-300"
          to="/"
        >
          Accueil
        </Link>
        <Link
          className="mx-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-300"
          to="/cart"
        >
          Panier
        </Link>
        <Link
          className="mx-4 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-300"
          to="/wishlist"
        >
          Wishlist
        </Link>
      </nav>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
