import { useState, useEffect } from "react";
import Products from "../Products/Products";
import styles from "./HomePage.module.scss";

const HomePage = ({ carousel }) => {

  //Set current Image to chnage in carousel
  const [currentImage, setCurrentImage] = useState(0);
  const lengthOfCarousel = carousel.length;
  console.log("currentImage-",currentImage);
  console.log("lengthOfCarousel-",lengthOfCarousel)

  //Handle on click on arrow buttons
  const handleNext = () => {
    setCurrentImage((currentImage + 1) % lengthOfCarousel);
    console.log(currentImage)
  };
  //Handle on click on arrow buttons
  const handlePrev = () => {
    setCurrentImage(
      currentImage === 0 ? lengthOfCarousel - 1 : currentImage - 1
    );
  };

 //useEffect to change images pn carousel
  useEffect(() => {
    setTimeout(() => {
      setCurrentImage((currentImage + 1) % lengthOfCarousel);
    }, 5000);
  }, [currentImage]);

  return (
    <section>
      <div className={styles.container__carousel__position}>
        <button
          className={styles.container__carousel__buttonPrev}
          onClick={handlePrev}
        >
          &#129120;
        </button>
        <button
          className={styles.container__carousel__buttonNext}
          onClick={handleNext}
        >
          &#129122;
        </button>

        {carousel
          ? carousel.map((images, index) => (
              <div key={index}>
                {index === currentImage && (
                  <div>
                    <img
                      className={styles.container__carousel__image}
                      src={images.carouselImage}
                    />
                    <h2 className={styles.container__featured__text}>
                      {images.text}
                    </h2>
                  </div>
                )}
              </div>
            ))
          : <img src="" alt="No Images to Display"/>}
      </div>
      <div>
        <Products />
      </div>
    </section>
  );
};
export default HomePage;
