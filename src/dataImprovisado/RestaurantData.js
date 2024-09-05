// data/restaurantData.js
export const restaurantData = [
    {
      id: '1',
      nombre: 'Restaurante Mexicano',
      foto: '/Assets/comidaMexicana.jpg',
      direccion: '123 Calle Falsa, Ciudad',
      rangoPrecio: '$$',
      menu: [
        { name: 'Tacos al Pastor', price: '$10', description: 'tacos de carne cortada a cuchillo con cebollita picada y cilantro' },
        { name: 'Enchiladas', price: '$12', description: 'plato tipico mexicano, muy picante y condimentado' },
      ],
    },
    {
      id: '2',
      nombre: 'Restaurante Italiano',
      foto: '/Assets/comidaItaliana.jpg',
      direccion: '456 Via Roma, Ciudad',
      rangoPrecio: '$$$',
      menu: [
        { name: 'Pizza Margherita', price: '$15', description: 'pizza de masa madre, muzzarela, tomate y albahaca con un poco de pesto' },
        { name: 'Lasagna', price: '$18', description:'lasagna de carne con muuuucha salsa de tomate y cebollita en cada capa'},
      ],
    },
  ];
  
  export const getRestaurantById = (id) => {
    return restaurantData.find(restaurant => restaurant.id === id);
  };
  