import { useEffect, useState } from "react";
import API from "../services/api";
import { Link } from "react-router-dom";
import { WHATSAPP_NUMBER } from "../config";

export default function CarsList() {
  const [cars, setCars] = useState([]);
  const [carType, setCarType] = useState("");
  const [availabilityType, setAvailabilityType] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchCars = async (pg = page) => {
    try {
      const params = new URLSearchParams();
      if (carType) params.append("CarType", carType);
      if (availabilityType) params.append("AvailabilityType", availabilityType);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (sort) params.append("sort", sort);
      params.append("page", pg);
      params.append("limit", 8);

      const res = await API.get(`/cars?${params.toString()}`);
      setCars(res.data.cars);
      setTotalPages(res.data.totalPages);
      setPage(res.data.currentPage);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    fetchCars(1);
  }, []);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchCars(1);
  };

  const handleSortChange = (e) => {
    setSort(e.target.value);
    fetchCars(1);
  };

  // Toggle functions for radio-like behavior
  const toggleCarType = (type) => {
    setCarType(carType === type ? "" : type);
  };

  const toggleAvailabilityType = (type) => {
    setAvailabilityType(availabilityType === type ? "" : type);
  };

  const clearFilters = () => {
    setCarType("");
    setAvailabilityType("");
    setMinPrice("");
    setMaxPrice("");
    setSort("");
    fetchCars(1);
  };

  return (
    <div className="cars-list-container">
      {/* Header Section */}
      <div className="page-header">
        <h1>Find Your Perfect Ride</h1>
        <p>Choose from our exclusive collection of luxury cars.</p>
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        <form onSubmit={handleFilter}>
          <div className="content-wrapper">
            <aside className="filters-sidebar">
              <div className="filter-header">
                <h2>Filters</h2>
                <button type="button" onClick={clearFilters} className="clear-filters">
                  Clear All
                </button>
              </div>

              <div className="filter-group">
                <h3>Car Type</h3>
                {["Sedan", "SUV", "Sports", "Electric", "Luxury"].map((type) => (
                  <div className="filter-option" key={type}>
                    <input 
                      type="checkbox" 
                      id={`car-type-${type}`}
                      checked={carType === type} 
                      onChange={() => toggleCarType(type)} 
                    />
                    <label htmlFor={`car-type-${type}`}>{type}</label>
                  </div>
                ))}
              </div>

              <div className="filter-group">
                <h3>Availability</h3>
                {["Buy", "Rent"].map((availability) => (
                  <div className="filter-option" key={availability}>
                    <input 
                      type="checkbox" 
                      id={`availability-${availability}`}
                      checked={availabilityType === availability} 
                      onChange={() => toggleAvailabilityType(availability)} 
                    />
                    <label htmlFor={`availability-${availability}`}>{availability}</label>
                  </div>
                ))}
              </div>

              <div className="filter-group">
                <h3>Price Range</h3>
                <div className="price-inputs">
                  <div className="price-input">
                    <label>Min Price</label>
                    <input
                      type="number"
                      placeholder="$0"
                      className="luxury-input"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <div className="price-input">
                    <label>Max Price</label>
                    <input
                      type="number"
                      placeholder="$∞"
                      className="luxury-input"
                      value={maxPrice}
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="apply-filters-btn">
                Apply Filters
              </button>
            </aside>

            <div className="cars-grid-container">
              <div className="results-header">
                <div className="results-count">
                  <strong>{cars.length} cars</strong> available
                </div>
                <div className="sort-dropdown">
                  <label>Sort by:</label>
                  <select value={sort} onChange={handleSortChange}>
                    <option value="">Recommended</option>
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="popular">Most Popular</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>

              {/* Car Grid */}
              <div className="car-grid">
                {cars.map((car) => (
                  <div key={car.id} className="car-card">
                    <div className="car-image">
                      <div className="car-image-icon">
                        {car.images && car.images.length > 0 ? (
                          <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                        ) : (
                          <div className="no-image-placeholder">
                            <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="car-info">
                      <h3>{`${car.brand} ${car.model}`}</h3>
                      <div className="car-specs">
                        <span>{car.availabilityType === "rent" ? "Rental" : "Purchase"}</span>
                        <span>⚙️ Automatic</span>
                        <span>👥 5 Seats</span>
                        <span>⛽ Hybrid</span>
                      </div>
                      
                      {car.availabilityType === "rent" ? (
                        <>
                          <div className="car-price">{`$${car.price}/day`}</div>
                          <div className="car-actions">
                            {(car.availabilityType === "rent" || car.availabilityType === "both") && (
                              <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                  `Hello, I want to rent the ${car.brand} ${car.model}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="car-btn no-underline"
                                style={{ color: "white" }}
                              >
                                Rent Now
                              </a>
                            )}
                            <button className="car-btn">
                              <Link to={`/cars/${car.id}`} className="no-underline" style={{ color: "white" }}>
                                View Details
                              </Link>
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="car-price">{`$${car.price}`}</div>
                          <div className="car-actions">
                            {(car.availabilityType === "buy" || car.availabilityType === "both") && (
                              <a
                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                  `Hello, I'm interested in buying the ${car.brand} ${car.model}.`
                                )}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="car-btn no-underline"
                                style={{ color: "white" }}
                              >
                                Buy Now
                              </a>
                            )}
                            <button className="car-btn">
                              <Link to={`/cars/${car.id}`} className="no-underline" style={{ color: "white" }}>
                                View Details
                              </Link>
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* No Results Message */}
              {cars.length === 0 && (
                <div className="no-results">
                  <h3>No cars found</h3>
                  <p>Try adjusting your filters to see more results.</p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="pagination">
          <button
            disabled={page === 1}
            onClick={() => fetchCars(page - 1)}
            className="pagination-btn prev"
          >
            ← Previous
          </button>

          <div className="pagination-numbers">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(totalPages - 4, page - 2)) + i;
              if (pageNum > totalPages) return null;
              return (
                <button
                  key={pageNum}
                  onClick={() => fetchCars(pageNum)}
                  className={`pagination-number ${pageNum === page ? 'active' : ''}`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            disabled={page === totalPages}
            onClick={() => fetchCars(page + 1)}
            className="pagination-btn next"
          >
            Next →
          </button>
        </div>
      )}
    </div>
  );
}