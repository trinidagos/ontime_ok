"use client";

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation'; // Reemplaza useRouter
import Header from '@/components/header';
import Image from 'next/image';
import { RestaurantMenu, MenuItem } from '@/types'; // Importa la interfaz correcta
import billete from '/public/Assets/icons/billete.svg';
import ubicacion from '/public/Assets/icons/ubicacion.svg';
import masInfo from '/public/Assets/icons/+.svg';

const RestaurantDetails = () => {
  const pathname = usePathname(); // Obtiene la ruta actual
  const id = pathname.split('/').pop(); // Extrae el id de la URL
  const [restaurant, setRestaurant] = useState<RestaurantMenu | null>(null);
  const [selectedDish, setSelectedDish] = useState<MenuItem | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = (dish: MenuItem) => {
    setSelectedDish(dish);
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDish(null);
  };

  useEffect(() => {
    if (id) {
      const fetchRestaurant = async () => {
        try {
          const response = await fetch(`/api/getInfo_RestyPlatos/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data: RestaurantMenu = await response.json();
          setRestaurant(data);
        } catch (error) {
          console.error('Error fetching restaurant:', error);
        }
      };
      fetchRestaurant();
    }
  }, [id]);

  if (!restaurant) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <main>
        <div className="conteiner-imagen-resto">
          <img className="imagen-resto" src={restaurant.foto} alt={restaurant.nombre} />
        </div>

        <div className="conteiner-nombre-resto">
          <span className="nombre-resto">{restaurant.nombre}</span>
        </div>

        <div className="conteiner-ubicacion">
          <img className="icon-ubicacion" src={ubicacion} alt="Ubicación" />
          <span className="ubicacion">{restaurant.direccion}</span>
        </div>

        <div className="conteiner-rango-precio">
          <img className="icon-billete" src={billete} alt="Precio" />
          <span className="rango-precio">{restaurant.rangoPrecio}</span>
        </div>

        <div className="conteiner-reservar-button">
          <button className="reservar-button">RESERVAR</button>
        </div>

        <div className="nav-sections">
          <hr />
          <div className="nav-links">
            <a href="#nosotros" className="nav-link">Nosotros</a>
            <a href="#menu" className="nav-link">Menú</a>
            <a href="#resenas" className="nav-link">Reseñas</a>
          </div>
          <hr />
        </div>

        <section id="menu" className="section-content-menu">
          <h1>Menú</h1>
          <ul>
            {restaurant.menu.map((item, index) => (
              <li key={index}>
                <div className="plato">
                  <span>{item.name}</span>
                  <span className="descripcion">
                    {item.description.length > 50 ? `${item.description.substring(0, 50)}...` : item.description}
                    <button type="button" className="mas-info-btn" onClick={() => openPopup(item)}>más</button>
                  </span>
                  <div className="info">
                    <span className="precio">{item.price}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {isPopupOpen && selectedDish && (
            <div className="popup-overlay" onClick={closePopup}>
              <div className="popup" onClick={(e) => e.stopPropagation()}>
                <button className="close-btn" onClick={closePopup}>X</button>
                <img src={selectedDish.imageUrl} alt={selectedDish.name} className="popup-image" />
                <h2>{selectedDish.name}</h2>
                <p>{selectedDish.description}</p>
              </div>
            </div>
          )}
        </section>

        <section id="resenas" className="section-content-resenas">
          <h2>Reseñas</h2>
          <p>Opiniones de los clientes.</p>
        </section>
      </main>
    </>
  );
};

export default RestaurantDetails;
