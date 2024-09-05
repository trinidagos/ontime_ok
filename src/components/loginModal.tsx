"use client";  // ← Añade esto al inicio del archivo

import React from 'react';

const LoginModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content-login" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header-login">
          <h2>Log in</h2>
          <button onClick={onClose}>X</button>
        </div>
        <div className="modal-body-login">
          <form>
            <input type="text" placeholder="Nombre" />
            <input type="password" placeholder="Contraseña" />
            <button type="submit">INGRESAR</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
