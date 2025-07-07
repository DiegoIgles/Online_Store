// src/components/Footer.jsx

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Logo y nombre */}
      <div className="footer-brand">
        <img src="/images/logo.png" alt="Logo HOMETECH" className="footer-logo" />
        <span className="text-blue">Online</span> <span className="text-white">Store</span>   
           </div>

     

      {/* Info de contacto */}
      <div className="footer-contact">
        <p>Email: contacto@hometech.com</p>
        <p>Tel: +591 75982874</p>
      </div>

      {/* Derechos */}
      <div className="footer-copy">
        &copy; {new Date().getFullYear()} Online Store. Todos los derechos reservados.
      </div>
    </footer>
  );
};

export default Footer;
