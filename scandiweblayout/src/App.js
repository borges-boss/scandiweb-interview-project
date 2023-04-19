import './App.css';
import { Routes, Route } from "react-router-dom";
import Products from './modules/screens/products/Products';
import AddProducts from './modules/screens/add-products/AddProducts';
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route index element={<Products />} />
        <Route  path="/addproduct" element={<AddProducts />} />
      </Routes>
    </Router>
  );
}

export default App;
