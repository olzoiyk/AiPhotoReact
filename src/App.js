import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  // Array of image data
  const images = [
    { id: 1, src: '/img/photo1.jpg', alt: 'Photo 1' },
    { id: 2, src: '/img/photo2.jpg', alt: 'Photo 2' },
    { id: 3, src: '/img/photo3.jpg', alt: 'Photo 3' },
    { id: 4, src: '/img/photo4.jpg', alt: 'Photo 4' },
    { id: 5, src: '/img/photo5.jpg', alt: 'Photo 5' },
    { id: 6, src: '/img/photo6.jpg', alt: 'Photo 6' },
    { id: 7, src: '/img/photo7.jpg', alt: 'Photo 7' },
    { id: 8, src: '/img/photo8.jpg', alt: 'Photo 8' },
    { id: 9, src: '/img/photo9.jpg', alt: 'Photo 9' },
  ];
  // State for lightbox
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Open lightbox with specific image
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsLightboxOpen(true);
  };

  // Close lightbox
  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  // Show previous image
  const showPrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  // Show next image
  const showNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  //Handle keyboard
  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      showPrevious();
    } else if (e.key === 'ArrowRight') {
      showNext();
    } else if (e.key === 'Escape') {
      closeLightbox();
    }
  };

  // Listen for keyboard events
  useEffect(() => {
    if (isLightboxOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isLightboxOpen]);

  return (
    <div className="App">
      <header>
        <h1>Aidyn Photography</h1>
        <nav>
          <ul>
            <li><a href="#hero">Home</a></li>
            <li><a href="#gallery">Gallery</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section id="hero">
        <div className="hero-content">
          <h2>Capturing Life's Beautiful Moments</h2>
          <p>Professional Photograpy Services</p>
        </div>
      </section>

      {/*Gallery Section*/}
      <section id="gallery">
        <h2>My Work</h2>
        <div className="gallery-grid">
          {images.map((image, index) => (
            <img
              key={image.id}
              src={image.src}
              alt={image.alt}
              onClick={() => openLightbox(index)}
              style={{ cursor: 'pointer' }}
            />
          ))}
        </div>
      </section>

      {/*About Section*/}
      <section id="about">
        <h2>About Me</h2>
        <p>Hi, I'm Aidyn, a professional photographer specializing in family photos, weddings, portrait, nature and architecture</p>
      </section>

      {/*Contact Section */}
      <section id="contact">
        <h2>Get in Touch</h2>
        <p>Email: aidyn@photo.com</p>
        <p>Instagram: @aiphotokz</p>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; 2025 Aidyn Photography. All rights reserved.</p>
      </footer>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="lightbox active"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex="0"
        >
          <span className="close" onClick={closeLightbox}>
            &times;
          </span>
          <span className="prev" onClick={(e) => { e.stopPropagation(); showPrevious(); }}>
            &#10094;
          </span>
          <span className="next" onClick={(e) => { e.stopPropagation(); showNext(); }}>
            &10095;
          </span>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

export default App;
