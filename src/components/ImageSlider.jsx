import React, { useEffect, useState } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";

const ImageSlider = () => {
  const [images, setImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiKey = "46366965-37fc40933b08b8cc3962d9ffe";
  const url = `https://pixabay.com/api/?key=${apiKey}&image_type=photo&per_page=12`;

  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }
      const data = await response.json();
      const imageUrls = data.hits.map((photo) => photo.webformatURL);
      setImages(imageUrls);
    } catch (error) {
      console.error("Error fetching images:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  if (loading) {
    return (
      <div>
        <h1>Loading Data! Please wait...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Error: {error}</h1>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-gradient-to-r from-yellow-200 from-14% via-sky-500 via-40% to-red-500 to-90% ...">
      <div className="flex flex-col items-center max-w-screen-xl pt-24 mx-auto slider-container">
        <div className="flex items-center gap-10">
          <BsArrowLeftCircleFill
            className="text-4xl arrow-left arrow"
            onClick={prevSlide}
          />
          <div
            className="image-container"
            style={{ width: "600px", height: "450px" }}
          >
            {images.length > 0 && (
              <img
                src={images[currentSlide]}
                alt={`Slide ${currentSlide}`}
                className="current-image"
                // Set width and height to 100% of the container
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            )}
          </div>
          <BsArrowRightCircleFill
            className="text-4xl arrow-right arrow"
            onClick={nextSlide}
          />
        </div>
        <div
          className="circle-indicators"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "25px",
          }}
        >
          {images.map((_, index) => (
            <span
              key={index}
              className={`circle ${currentSlide === index ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: "12px",
                height: "12px",
                borderRadius: "50%",
                backgroundColor: currentSlide === index ? "blue" : "lightgray",
                margin: "0 7px",
                transition: "background-color 0.3s ease, transform 0.3s ease",
                cursor: "pointer",
                transform: currentSlide === index ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
        <h1 className="pt-10 font-bold text-black underline text-size-2xl">Image Slider</h1>
      </div>
    </div>
  );
};

export default ImageSlider;
