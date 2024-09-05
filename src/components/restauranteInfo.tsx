// src/components/restauranteInfo.tsx
import Image, { StaticImageData } from 'next/image';
import Header from './header';
import MasInfoBtn from './masInfoBtn';


interface Plato {
  id: number;
  name: string;
  price: number;
}

interface RestauranteProps {
  nombreResto: string;
  ubicacion: string;
  rangoPrecio: string;
  imagenResto: string | StaticImageData;
  platos: Plato[];
}

const RestauranteInfo = ({ nombreResto, ubicacion, rangoPrecio, imagenResto, platos }: RestauranteProps) => {
  return (
    <>
      <Header />
      
      <div className="conteiner-imagen-resto">
        <Image className="imagen-resto" src={imagenResto} alt={nombreResto} width={1000} height={667} />
      </div>

      <div className="conteiner-nombre-resto"><span className="nombre-resto">{nombreResto}</span></div>

      <div className="conteiner-ubicacion">
        <Image className="icon-ubicacion" src="/Assets/icons/ubicacion.svg" alt="Ubicación" width={24} height={24} />
        <span className="ubicacion">{ubicacion}</span>
      </div>

      <div className="conteiner-rango-precio">
        <Image className="icon-billete" src="/Assets/icons/billete.svg" alt="Precio" width={24} height={24} />
        <span className="rango-precio">{rangoPrecio}</span>
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
        {platos.map(plato => (
          <div key={plato.id} className="plato" id={`plato${plato.id}`}>
            <span>{plato.name}</span>
            <div className="info">
              <MasInfoBtn />
              <span id="precio">${plato.price.toLocaleString()}</span>
            </div>
          </div>
        ))}
      </section>

      <section id="resenas" className="section-content-resenas">
        <h2>Reseñas</h2>
        <p>Opiniones de los clientes.</p>
      </section>
    </>
  );
};

export default RestauranteInfo;
