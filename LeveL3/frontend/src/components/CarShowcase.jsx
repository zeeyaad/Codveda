import React from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import { useEffect, useState } from "react";
import { WHATSAPP_NUMBER } from "../config";



export default function CarShowcase() {

    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        const res = await API.get(`/cars`);
    setCars(res.data.cars);
    }

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <>
        <section className="car-showcase" id="rent">
            <h2 className="section-title">Featured Vehicles</h2>
                <div className="car-grid">
                {cars.map((car) => (
                        <div key={car.id} className="car-card">
                            <div className="car-image">
                                <div className="car-image-icon">
                                    {car.images && car.images.length > 0 ? (
                                        <img src={car.images[0]} alt={`${car.brand} ${car.model}`} />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-[#667eea] to-[#764ba2] flex items-center justify-center">
                                            <svg className="w-12 h-12 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div class="car-info">
                                <h3>{`${car.brand} ${car.model}`}</h3>
                                <div class="car-specs">
                                    <span>{car.type === "rent" ? "Rental" : "Purchase"}</span>
                                    <span>⚙️ Automatic</span>
                                    <span>👥 5 Seats</span>
                                    <span>⛽ Hybrid</span>
                                </div>
                                {car.type === "rent" ? (
                                    <>
                                        <div className="car-price">{`$${car.price}/day`}</div>
                                        <button className="car-btn">
                                             {(car.availabilityType === "rent" || car.availabilityType === "both") && (
                                                <a
                                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                                    `Hello, I want to rent the ${car.brand} ${car.model}.`
                                                    )}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    lassName="no-underline" style={{ color: "white" }}
                                                >
                                                    Rent Now
                                                </a>
                                            )}
                                        </button>
                                        <button className="car-btn">
                                            <Link to={`/cars/${car.id}`} className="no-underline" style={{ color: "white" }}>View Details</Link>
                                        </button>
                                    </>
                                    ) : (
                                    <>
                                        <div className="car-price">{`$${car.price}`}</div>
                                        <button className="car-btn">
                                            {(car.availabilityType === "buy" || car.availabilityType === "both") && (
                                                <a
                                                href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                                                    `Hello, I'm interested in buying the ${car.brand} ${car.model}.`
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="no-underline" style={{ color: "white" }}
                                                >
                                                    Buy Now
                                                </a>
                                            )}
                                        </button>
                                        <button className="car-btn">
                                            <Link to={`/cars/${car.id}`} className="no-underline" style={{ color: "white" }}>View Details</Link>
                                        </button>
                                    </>
                                )}

                            </div>
                        </div>
                    ))}
                </div>
        </section>
    </>
    );
}