"use client";

import React, { useState } from 'react';

const RestaurantProfileForm = ({ initialData, onSave }) => {
  const [restaurantData, setRestaurantData] = useState(initialData || {
    opcionesAlimentarias: {
      glutenFree: false,
      vegetariano: false,
      vegano: false,
      kosher: false,
    },
    metodoPago: {
      efectivo: false,
      tarjeta: false,
      mercadoPago: false,
    },
    menu: [
      { name: '', price: '' }
    ],
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setRestaurantData((prevState) => ({
        ...prevState,
        opcionesAlimentarias: {
          ...prevState.opcionesAlimentarias,
          [name]: checked,
        }
      }));
    } else if (name.startsWith('metodoPago')) {
      setRestaurantData((prevState) => ({
        ...prevState,
        metodoPago: {
          ...prevState.metodoPago,
          [name.split('.')[1]]: checked,
        }
      }));
    } else {
      setRestaurantData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleMenuChange = (index, e) => {
    const { name, value } = e.target;
    const updatedMenu = restaurantData.menu.map((item, i) =>
      i === index ? { ...item, [name]: value } : item
    );
    setRestaurantData((prevState) => ({
      ...prevState,
      menu: updatedMenu,
    }));
  };

  const addMenuItem = () => {
    setRestaurantData((prevState) => ({
      ...prevState,
      menu: [...prevState.menu, { name: '', price: '' }],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías llamar a la función para guardar los datos en la base de datos
    onSave(restaurantData);
  };

  return (
    <form onSubmit={handleSubmit} className="restaurant-profile-form">
      <div className="opciones-alimentarias">
        <h2>Opciones alimentarias:</h2>
        {Object.keys(restaurantData.opcionesAlimentarias).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              name={key}
              checked={restaurantData.opcionesAlimentarias[key]}
              onChange={handleInputChange}
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>

      <div className="metodo-pago">
        <h2>Método de Pago:</h2>
        {Object.keys(restaurantData.metodoPago).map((key) => (
          <label key={key}>
            <input
              type="checkbox"
              name={`metodoPago.${key}`}
              checked={restaurantData.metodoPago[key]}
              onChange={handleInputChange}
            />
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </label>
        ))}
      </div>

      <div className="menu">
        <h2>Menú:</h2>
        {restaurantData.menu.map((item, index) => (
          <div key={index} className="menu-item">
            <input
              type="text"
              name="name"
              value={item.name}
              onChange={(e) => handleMenuChange(index, e)}
              placeholder="Nombre del Plato"
            />
            <input
              type="text"
              name="price"
              value={item.price}
              onChange={(e) => handleMenuChange(index, e)}
              placeholder="Precio"
            />
          </div>
        ))}
        <button type="button" onClick={addMenuItem}>AGREGAR PLATO</button>
      </div>

      <button type="submit">GUARDAR</button>
    </form>
  );
};

export default RestaurantProfileForm;
