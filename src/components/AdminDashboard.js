// src/components/AdminDashboard.jsx

import React, { useState, useEffect } from 'react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import {
  FaEdit,
  FaTrash,
  FaSignOutAlt,
  FaBoxOpen,
  FaFolderPlus,
  FaUserPlus,
} from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [adminData, setAdminData] = useState(null);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const dashboardRes = await axios.get('/admin/dashboard');
        setAdminData(dashboardRes.data);

        const usersRes = await axios.get('/admin/users');
        setUsers(usersRes.data.users);

        const productsRes = await axios.get('/products');
        setProducts(productsRes.data.data);

        const categoriesRes = await axios.get('/categories');
        setCategories(categoriesRes.data);

      } catch (err) {
        console.error(err);
        setError('No autorizado o error de servidor.');
        if (err.response && err.response.status === 401) {
          navigate('/admin/login');
        }
      }
    };

    fetchDashboard();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/admin/login');
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este usuario?')) return;

    try {
      await axios.delete(`/admin/users/${userId}`);
      setUsers(users.filter((u) => u.id !== userId));
      alert('Usuario eliminado correctamente ✅');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar usuario.');
    }
  };

  const handleDeleteProduct = async (productId) => {
    if (!window.confirm('¿Seguro que quieres eliminar este producto?')) return;

    try {
      await axios.delete(`/admin/products/${productId}`);
      setProducts(products.filter((p) => p.id !== productId));
      alert('Producto eliminado correctamente ✅');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto.');
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    if (!window.confirm('¿Seguro que quieres eliminar esta categoría?')) return;

    try {
      await axios.delete(`/admin/categories/${categoryId}`);
      setCategories(categories.filter((c) => c.id !== categoryId));
      alert('Categoría eliminada correctamente ✅');
    } catch (err) {
      console.error(err);
      alert('Error al eliminar categoría.');
    }
  };

  const handleAssignCategory = async (productId, categoryId) => {
    if (!categoryId) return;

    try {
      await axios.put(`/admin/products/${productId}/category`, {
        category_id: parseInt(categoryId),
      });
      alert('✅ Categoría asignada correctamente');

      setProducts(
        products.map((p) =>
          p.id === productId ? { ...p, category_id: parseInt(categoryId) } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert('❌ Error al asignar categoría');
    }
  };

  if (error) return <div className="admin-error">{error}</div>;
  if (!users.length && !products.length && !categories.length && !adminData) {
    return <div className="admin-loading">Cargando panel...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Bienvenido, Admin</h1>

      <div className="admin-actions">
        <button onClick={() => navigate('/admin/products/create')}>
          <FaBoxOpen /> Crear Producto
        </button>
        <button onClick={() => navigate('/admin/categories/create')}>
          <FaFolderPlus /> Crear Categoría
        </button>
        <button onClick={handleLogout}>
          <FaSignOutAlt /> Cerrar Sesión
        </button>
      </div>

      {/* Usuarios */}
      <div className="admin-users">
        <h2>Admins Registrados</h2>
        {users.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Email</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role?.name || 'Sin rol'}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/users/${u.id}/edit`)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteUser(u.id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay usuarios registrados.</p>
        )}

        <div className="users-actions">
          <button
            className="create-user-btn"
            onClick={() => navigate('/admin/users/create')}
          >
            <FaUserPlus /> Crear Usuario
          </button>
        </div>
      </div>

      {/* Productos */}
      <div className="admin-products">
        <h2>Productos Registrados</h2>
        {products.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoría</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>${p.price}</td>
                  <td>{p.stock}</td>
                  <td>
                    <select className="category-select"
                      value={p.category_id || ''}
                      onChange={(e) => handleAssignCategory(p.id, e.target.value)}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteProduct(p.id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay productos registrados.</p>
        )}
      </div>

      {/* Categorías */}
      <div className="admin-users">
        <h2>Categorías Registradas</h2>
        {categories.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id}>
                  <td>{c.id}</td>
                  <td>{c.name}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={() => navigate(`/admin/categories/${c.id}/edit`)}
                    >
                      <FaEdit /> Editar
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteCategory(c.id)}
                    >
                      <FaTrash /> Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No hay categorías registradas.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
