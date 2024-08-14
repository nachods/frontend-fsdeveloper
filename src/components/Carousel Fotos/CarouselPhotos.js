import React from "react";
import img1 from '../../assets/images/Slider1.jpeg';
import img2 from '../../assets/images/Slider2.jpeg';
import img3 from '../../assets/images/Slider3.jpeg';

const CarouselPhotos = () => {
  return (
    <div id="carouselExample" class="carousel slide">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src={img1} class="d-block w-100" alt="img1.png" />
        </div>
        <div class="carousel-item">
          <img src={img2} class="d-block w-100" alt="img2.png" />
        </div>
        <div class="carousel-item">
          <img src={img3} class="d-block w-100" alt="img3.png" />
        </div>
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExample"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default CarouselPhotos;
