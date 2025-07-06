// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';  // Estilos globales
import Navbar from './components/Navbar';  // Navbar
import Home from './components/Home';  // Nueva vista de Inicio
import ProductList from './components/ProductList';  // Lista de productos
import ProductDetail from './components/ProductDetail';  // Detalle de producto
import Footer from './components/Footer';
import LoginAdmin from './components/LoginAdmin';
import AdminDashboard from './components/AdminDashboard';
import CreateUser from './components/CreateUser';
import EditUser from './components/EditUser';
import CreateProduct from './components/CreateProduct';
import CategoryList from './components/CategoryList'; // 👈 NUEVO
import CreateCategory from './components/CreateCategory';
import EditCategory from './components/EditCategory';
import ProductByCategory from './components/ProductByCategory';
function App() {
  return (
    <Router>
      <Navbar />  {/* Navbar siempre visible arriba */}
      <br />
      <br />
      <br />
      {/* Contenido principal con rutas */}
      <Routes>
        <Route path="/" element={<Home />} />            {/* Página de Inicio */}
        <Route path="/productos" element={<ProductList />} />  {/* Página de Productos */}
        <Route path="/productos/:id" element={<ProductDetail />} />  {/* Detalle de producto */}
        <Route path="/admin/login" element={<LoginAdmin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
       <Route path="/admin/users/create" element={<CreateUser />} />
<Route path="/admin/users/:id/edit" element={<EditUser />} />
<Route path="/admin/products/create" element={<CreateProduct />} />
<Route path="/categorias" element={<CategoryList />}  />
<Route path="/admin/categories/create" element={<CreateCategory />} />
<Route path="/admin/categories/:id/edit" element={<EditCategory />} />
<Route path="/categorias/:id" element={<ProductByCategory />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
