import React, { useState } from 'react';

// eslint-disable-next-line react/prop-types
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  const handleError = (error, errorInfo) => {
    console.error("Error caught by ErrorBoundary: ", error, errorInfo);
    setHasError(true);
  };

  if (hasError) {
    return <h1>Something went wrong. Please try again later.</h1>;
  }

  return (
    <React.ErrorBoundary fallbackRender={({ error }) => handleError(error)}>
      {children}
    </React.ErrorBoundary>
  );
};

export default ErrorBoundary;