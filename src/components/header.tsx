// components/Header/Header.tsx
import Image from 'next/image';
import styles from './header.module.css';
import logoReloj from '/public/Assets/icons/logoReloj.svg'

const Header = () => (
  <header>
    <div className={styles.conteinerAzul}></div>
    <div className={styles.conteinerHero}>
      <div className={styles.hero}>
        <div className={styles.conteinerLogo}>
          <a href="/"><Image src={logoReloj} alt="Logo" width={50} height={50} className={styles.logoReloj} /></a>
          <span className={styles.logoNombre}><a href="/">N TIME</a></span>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
