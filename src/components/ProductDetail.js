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
                src={`https://backend-eco.cisistemasficct.com${img}`}
                alt={`Imagen ${index + 1} de ${product.name}`}
                className="carousel-image"
                onClick={() => setSelectedImage(`https://backend-eco.cisistemasficct.com${img}`)}
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

          <a href={`https://wa.me/75982874?text=Hola,%20estoy%20interesado%20en%20el%20producto%20${product.name}%20y%20me%20gustaría%20realizar%20una%20compra.`} target="_blank" rel="noopener noreferrer">
            <button className="buy-button">
              🟢 WhatsApp
            </button>
          </a>
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
