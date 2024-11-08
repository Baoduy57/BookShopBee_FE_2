import React from "react";
import "./NotFoundPage.css"; // Import file CSS

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1 className="error-code">404</h1>
        <p className="error-message">
          Oops! The page you're looking for doesn't exist.
        </p>
        <a href="/" className="back-home-button">
          Go Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
