// src/components/ProductList.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [initialLoading, setInitialLoading] = useState(true); // 🚩 carga inicial
  const [isFetching, setIsFetching] = useState(false); // 🚩 refresco dinámico
  const [error, setError] = useState(null);
  const [name, setName] = useState('');
  const [debouncedName, setDebouncedName] = useState(name);
  const navigate = useNavigate();

  const fetchProducts = useCallback(() => {
    setIsFetching(true);

    const params = { name: debouncedName };

    axios
      .get('products', { params })
      .then((response) => {
        setProducts(response.data.data);
        setInitialLoading(false);
        setIsFetching(false);
      })
      .catch(() => {
        setError('Error al cargar los productos');
        setInitialLoading(false);
        setIsFetching(false);
      });
  }, [debouncedName]);

  // Debounce para búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedName(name);
    }, 500);

    return () => clearTimeout(timer);
  }, [name]);

  // Cargar productos
  useEffect(() => {
    fetchProducts();
  }, [debouncedName, fetchProducts]);

  const handleProductClick = (product) => {
    navigate(`/productos/${product.id}`);
  };

  if (initialLoading) return <div>Cargando productos...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
        
      <h1 id='product-h1'>Productos</h1>

      {/* Buscador */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar por nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      {/* Lista de productos */}
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
                width="200"
              />
              <h2>{product.name}</h2>
              <p>Precio: ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No se encontraron productos.</p>
        )}

        {/* Overlay mientras se actualiza */}
        {isFetching && <div className="loading-overlay">Buscando...</div>}
      </div>
    </div>
  );
};

export default ProductList;
