//interfaces necesarias
//declarar el tipo de los datos de 'restauranteData'
export interface MenuItem {
    name: string;
    price: string;
    description: string;
  }
  
  export interface RestaurantMenu {
    id: string;
    nombre: string;
    foto: string;
    direccion: string;
    rangoPrecio: string;
    menu: MenuItem[];
  }

  export interface RestaurantList {
    id: string;
    nombre: string;
    foto: string;
  }