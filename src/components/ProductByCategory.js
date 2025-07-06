// src/components/ProductListByCategory.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import './ProductList.css'; // ✅ Usa el mismo CSS

const ProductListByCategory = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/categories/${id}/products`)
      .then((res) => {
        setCategory(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const handleProductClick = (product) => {
    navigate(`/productos/${product.id}`);
  };

  if (loading) return <div>Cargando productos de la categoría...</div>;
  if (!category) return <div>Error cargando categoría.</div>;

  return (
    <div>
      <h1 id="product-h1">Productos de {category.name}</h1>

      <div className="product-list">
        {category.products.length > 0 ? (
          category.products.map((product) => (
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
          <p>No hay productos en esta categoría.</p>
        )}
      </div>
    </div>
  );
};

export default ProductListByCategory;
