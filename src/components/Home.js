// src/components/Home.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('products', { params: { limit: 4 } }) // Pide 4 productos destacados
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((error) => {
        console.error('Error al cargar productos destacados:', error);
      });
  }, []);

  const handleProductClick = (product) => {
    navigate(`/productos/${product.id}`);
  };

  return (
    <div className="home-container">
      {/* Hero con banners */}
      <div className="hero">
        <h1>Bienvenido!</h1>
        <p>Explora nuestras últimas novedades y productos destacados.</p>
        
      </div>

      {/* Sección productos destacados */}
      <section className="featured-section">
        <h2>Productos destacados</h2>
        <div className="product-list">
          {products.length > 0 ? (
            products.map((product) => (
              <div
                key={product.id}
                className="product-card"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={`https://backend-eco.cisistemasficct.com/storage/${product.image1}`}
                  alt={product.name}
                />
                <h2>{product.name}</h2>
                <p>Precio: ${product.price}</p>
              </div>
            ))
          ) : (
            <p>No hay productos para mostrar.</p>
          )}
        </div>
        <button
          className="see-more-btn"
          onClick={() => navigate('/productos')}
        >
          Ver todo el catálogo
        </button>
      </section>
    </div>
  );
};

export default Home;
