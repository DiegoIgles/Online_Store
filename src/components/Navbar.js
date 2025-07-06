import React, { useState, useEffect } from 'react';
import { FaHome, FaFolderOpen, FaShoppingCart, FaPhone, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom'; // Para SPA sin recarga
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
  }, [isOpen]);

  const closeMenu = () => setIsOpen(false);

  return (
    <>
      <nav className="navbar">
        <div className="menu-toggle" onClick={toggleMenu}>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
          <span className={`bar ${isOpen ? 'open' : ''}`}></span>
        </div>

        {/* Logo y texto */}
        <div className="navbar-brand">
          <img 
            src="/images/logo.png"
            alt="Logo"
            className="navbar-logo"
          />
          <div className="navbar-text">
              <span className="text-blue">Online</span> <span className="text-black">Store</span>
          </div>
        </div>
      </nav>

      {/* Fondo oscuro */}
      <div
        className={`menu-overlay ${isOpen ? 'active' : ''}`}
        onClick={closeMenu}
      ></div>

      {/* Menú desplegable */}
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link to="/" onClick={closeMenu}><FaHome /> Inicio</Link>
          </li>
          <li>
            <Link to="/categorias" onClick={closeMenu}><FaFolderOpen /> Categorías</Link>
          </li>
          <li>
            <Link to="/productos" onClick={closeMenu}><FaShoppingCart /> Productos</Link>
          </li>
          <li>
            <Link to="/contacto" onClick={closeMenu}><FaPhone /> Contacto</Link>
          </li>
          <li>
            <Link to="/admin/login" onClick={closeMenu}><FaSignInAlt /> Iniciar Sesión</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
