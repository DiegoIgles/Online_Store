import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get(`products/${id}`)
      .then(response => {
        setProduct(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Error al cargar el producto');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div>Cargando producto...</div>;
  if (error) return <div>{error}</div>;

  // 🔑 Nueva función para crear pago en backend y redirigir a checkout DLocal
  const handleBuy = async () => {
  try {
    console.log('👉 Enviando:', {
  amount: Number(product.price), // 🔑 Siempre número
      currency: 'USD',
      description: product.name,
   
    });

    const response = await axios.post('/payments', {
      amount: product.price,
      currency: 'USD',
      description: product.name,
       document: '12345678' // 👈 DNI de prueba

    });

    console.log('✅ Respuesta:', response.data);

    window.location.href = response.data.redirect_url;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
  }
};



  return (
    <div className="product-detail-container">
      <h1>{product.name}</h1>

      <div className="product-content">
        <div className="image-carousel">
          <div className="image-wrapper">
  {product.images && product.images.filter(Boolean).map((img, index) => (
    <img
      key={index}
      src={img} // ✅ usar tal cual viene
      alt={`Imagen ${index + 1} de ${product.name}`}
      className="carousel-image"
      onClick={() => setSelectedImage(img)}
    />
  ))}
</div>

        </div>

        <div className="product-details">
          <p><strong>Descripción:</strong> {product.description}</p>
          <p><strong>Precio:</strong> ${product.price}</p>
          <p><strong>Stock:</strong> {product.stock}</p>

          <button className="buy-button" onClick={handleBuy}>
           🛒 Comprar con Tarjeta
          </button>

         
        </div>
      </div>

      {selectedImage && (
        <div className="image-modal-overlay" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Ampliada" className="image-modal-content" />
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
