import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import { WHATSAPP_NUMBER } from "../config";

export default function CarDetails() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  console.log("CarDetails component rendered with ID:", id);

  useEffect(() => {
    const fetchCar = async () => {
      try {
        console.log("Fetching car with ID:", id);
        const res = await API.get(`/cars/${id}`);
        console.log("Car details response:", res.data);
        console.log("Car description:", res.data.description);
        setCar(res.data);
        if (res.data.images?.length > 0) {
          setMainImage(res.data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCar();
  }, [id]);

  const nextImage = () => {
    if (car?.images?.length > 1) {
      const nextIndex = (currentImageIndex + 1) % car.images.length;
      setCurrentImageIndex(nextIndex);
      setMainImage(car.images[nextIndex]);
    }
  };

  const prevImage = () => {
    if (car?.images?.length > 1) {
      const prevIndex = (currentImageIndex - 1 + car.images.length) % car.images.length;
      setCurrentImageIndex(prevIndex);
      setMainImage(car.images[prevIndex]);
    }
  };

  const selectImage = (index) => {
    setCurrentImageIndex(index);
    setMainImage(car.images[index]);
  };

  if (!car) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Navigation */}
      <nav className="luxury-nav">
        <div className="container mx-auto px-6 py-4">
          <Link to="/cars" className="back-btn">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Listings
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-8">
        <div className="car-details-grid">
          {/* Image Gallery Section */}
          <div className="image-gallery-section">
            <div className="main-image-container">
              {mainImage ? (
                <img
                  src={mainImage}
                  alt={`${car.brand} ${car.model}`}
                  className="main-image"
                />
              ) : (
                <div className="no-image-placeholder">
                  <svg className="w-20 h-20 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
              
              {/* Navigation Arrows */}
              {car.images && car.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="nav-arrow left-arrow"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="nav-arrow right-arrow"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {car.images && car.images.length > 1 && (
              <div className="thumbnail-gallery">
                {car.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => selectImage(index)}
                    className={`thumbnail ${currentImageIndex === index ? 'thumbnail-active' : ''}`}
                  >
                    <img
                      src={img}
                      alt={`${car.brand} ${car.model} view ${index + 1}`}
                      className="thumbnail-image"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="details-section">
            <div className="details-content">
              {/* Header */}
              <div className="car-header">
                <h1 className="car-title">
                  {car.brand} <span className="car-model">{car.model}</span>
                </h1>
                <div className={`availability-badge ${car.available ? 'available' : 'unavailable'}`}>
                  {car.available ? 'Available' : 'Not Available'}
                </div>
              </div>

              {/* Price */}
              <div className="price-section">
                <div className="price">
                  {car.availabilityType === 'rent' ? `$${car.price}/day` : `$${car.price}`}
                </div>
                <div className="price-label">
                  {car.availabilityType === 'rent' ? 'Rental Price' : 'Purchase Price'}
                </div>
              </div>

              {/* Specifications */}
              <div className="specs-grid">
                <div className="spec-item">
                  <div className="spec-icon">⚙️</div>
                  <div className="spec-content">
                    <div className="spec-label">Transmission</div>
                    <div className="spec-value">Automatic</div>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">👥</div>
                  <div className="spec-content">
                    <div className="spec-label">Seats</div>
                    <div className="spec-value">5 Seats</div>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">⛽</div>
                  <div className="spec-content">
                    <div className="spec-label">Fuel Type</div>
                    <div className="spec-value">Hybrid</div>
                  </div>
                </div>
                <div className="spec-item">
                  <div className="spec-icon">🚗</div>
                  <div className="spec-content">
                    <div className="spec-label">Type</div>
                    <div className="spec-value">{car.availabilityType === 'rent' ? 'Rental' : 'Purchase'}</div>
                  </div>
                </div>
              </div>

              {/* Description */}
              {car.description && (
                <div className="description-section">
                  <h3 className="description-title">Description</h3>
                  <p className="description-text">{car.description}</p>
                </div>
              )}

              {/* Action Buttons */}
              <div className="action-buttons">
                {car.available ? (
                  <div className="buttons-grid">
                    {(car.availabilityType === "rent" || car.availabilityType === "both") && (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hello, I want to rent the ${car.brand} ${car.model}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn rent-btn"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>
                        Rent Now
                      </a>
                    )}
                    {(car.availabilityType === "buy" || car.availabilityType === "both") && (
                      <a
                        href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                          `Hello, I'm interested in buying the ${car.brand} ${car.model}.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn buy-btn"
                      >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        Buy Now
                      </a>
                    )}
                  </div>
                ) : (
                  <div className="not-available-message">
                    <svg className="w-8 h-8 mr-3 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="not-available-title">Currently Unavailable</div>
                      <div className="not-available-text">This vehicle is not available for {car.availabilityType} at the moment.</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}