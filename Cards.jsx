import React, { useState } from "react";
import tourData from '../data.js';

const Cards = () => {
  const [tours, setTours] = useState(tourData);

  // Delete tour by ID
  const handleDelete = (id) => {
    const updatedTours = tours.filter((tour) => tour.id !== id);
    setTours(updatedTours);
  };

  // Refresh all tours
  const handleRefresh = () => {
    setTours(tourData);
  };

  return (
    <div className="tour-container text-center">
      {tours.length === 0 ? (
        <div>
          <h2 className="text-danger mb-3">No Tours Left</h2>
          <button className="btn btn-primary" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      ) : (
        tours.map((tour) => (
          <TourCard key={tour.id} tour={tour} onDelete={handleDelete} />
        ))
      )}
    </div>
  );
};

// Single Tour Card
const TourCard = ({ tour, onDelete }) => {
  const [expanded, setExpanded] = useState(false);

  const shortInfo =
    tour?.info?.length > 120 ? tour.info.substring(0, 120) + "..." : tour.info;

  return (
    <div className="tour-card">
      <img src={tour?.image} alt={tour?.name} className="tour-image" />
      <div className="tour-content">
        <h2 className="tour-title">{tour?.name}</h2>

        <p className="tour-info">
          {expanded ? tour?.info : shortInfo}{" "}
          {tour?.info?.length > 120 && (
            <span
              className="read-more"
              style={{ color: 'blue', cursor: 'pointer' }}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Read Less" : "Read More"}
            </span>
          )}
        </p>

        <div className="tour-footer">
          <h3 className="tour-price">₹ {tour?.price}</h3>
          <button className="tour-btn btn btn-danger" onClick={() => onDelete(tour.id)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
