// components/BookingModal/BookingModal.tsx
import React, { useState } from 'react';
import styles from './BookingModal.module.css';

const BookingModal = () => {
  const [step, setStep] = useState(1);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('');

  const handleDateSelect = (date: string) => {
    setDate(date);
    setStep(2);
  };

  const handleTimeSelect = (time: string) => {
    setTime(time);
    setStep(3);
  };

  const handleGuestsSelect = (guests: string) => {
    setGuests(guests);
    // Aquí podrías manejar la confirmación o el siguiente paso
  };

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <span className={styles.title}>AMAYTA PATISSERIE</span>
        <button className={styles.closeButton}>X</button>
      </div>
      {step === 1 && (
        <div className={styles.content}>
          <div className={styles.nav}>
            <button className={styles.navButton}>Fecha</button>
            <button className={styles.navButtonDisabled} disabled>Hora</button>
            <button className={styles.navButtonDisabled} disabled>Guests</button>
          </div>
          <div className={styles.grid}>
            {/* Reemplaza los botones con el calendario real más adelante */}
            {Array.from({ length: 30 }, (_, i) => (
              <button key={i} className={styles.gridItem} onClick={() => handleDateSelect(`2023-06-${i + 1}`)}></button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div className={styles.content}>
          <div className={styles.nav}>
            <button className={styles.navButton}>Jun 15</button>
            <button className={styles.navButton}>Hora</button>
            <button className={styles.navButtonDisabled} disabled>Guests</button>
          </div>
          <div className={styles.timeGrid}>
            <div>
              <h3>DESAYUNO</h3>
              <div className={styles.grid}>
                {Array.from({ length: 6 }, (_, i) => (
                  <button key={i} className={styles.gridItem} onClick={() => handleTimeSelect(`Desayuno ${i + 1}`)}></button>
                ))}
              </div>
            </div>
            <div>
              <h3>ALMUERZO</h3>
              <div className={styles.grid}>
                {Array.from({ length: 6 }, (_, i) => (
                  <button key={i} className={styles.gridItem} onClick={() => handleTimeSelect(`Almuerzo ${i + 1}`)}></button>
                ))}
              </div>
            </div>
            <div>
              <h3>CENA</h3>
              <div className={styles.grid}>
                {Array.from({ length: 6 }, (_, i) => (
                  <button key={i} className={styles.gridItem} onClick={() => handleTimeSelect(`Cena ${i + 1}`)}></button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 3 && (
        <div className={styles.content}>
          <div className={styles.nav}>
            <button className={styles.navButton}>Jun 15</button>
            <button className={styles.navButton}>Hora</button>
            <button className={styles.navButton}>Guests</button>
          </div>
          <div className={styles.grid}>
            {Array.from({ length: 10 }, (_, i) => (
              <button key={i} className={styles.gridItem} onClick={() => handleGuestsSelect(`${i + 1}`)}>{i + 1}</button>
            ))}
          </div>
          <div className={styles.confirmContainer}>
            <button className={styles.confirmButton}>CONFIRMAR</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingModal;
