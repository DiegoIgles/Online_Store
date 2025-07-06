// src/components/CategoryList.jsx

import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import './CategoryList.css'; // CSS específico
import { useNavigate } from 'react-router-dom';

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('categories')
      .then((res) => {
        setCategories(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError('Error al cargar categorías.');
      });
  }, []);

  const handleCategoryClick = (category) => {
    // Si tienes ruta de productos por categoría:
    navigate(`/categorias/${category.id}`);
  };

  return (
    <div className="category-container">
      <h1>Categorías</h1>
      {error && <p className="error">{error}</p>}

      <div className="category-list">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div
              key={category.id}
              className="category-card"
              onClick={() => handleCategoryClick(category)}
            >
              {category.image ? (
                <img
                  src={`http://192.168.100.111:8000/storage/${category.image}`}
                  alt={category.name}
                />
              ) : (
                <div className="category-placeholder">Sin imagen</div>
              )}
              <h2>{category.name}</h2>
            </div>
          ))
        ) : (
          <p>No hay categorías disponibles.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
