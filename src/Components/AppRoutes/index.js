import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../../Pages/Customers";
import Dashboard from "../../Pages/Dashbaord";
import Inventory from "../../Pages/Inventory";
import Orders from "../../Pages/Orders";
import EditProduct from "../../Pages/EditProduct/EditProduct.js";
import CategoryProduct from "../../Pages/Category/CategoryProduct.js";
import Login from "../../Pages/Login/index.js"
import AddProduct from "../../Pages/AddProduct/AddProduct.js";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/edit/:id" element={<EditProduct />}></Route>
      <Route path="/Souscategories" element={<CategoryProduct />}></Route>
      <Route path="/Addproduct" element={<AddProduct/>}/>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/inventory" element={<Inventory />}></Route>
      <Route path="/orders" element={<Orders />}></Route>
      <Route path="/customers" element={<Customers />}></Route>
      <Route path="/login" element={<Login/>}/>
    </Routes>
  );
}
export default AppRoutes;
