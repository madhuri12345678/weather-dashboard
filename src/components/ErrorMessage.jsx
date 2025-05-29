import React from "react";

function ErrorMessage({ error }) {
  if (!error) return null;

  let message = "Something went wrong. Please try again.";

  // Handle known errors like 404
  if (error.response && error.response.status === 404) {
    message = "City not found. Please try again.";
  }

  // Optional: Handle invalid API key (401)
  if (error.response && error.response.status === 401) {
    message = "Invalid API key. Please check your API key.";
  }

  return (
    <div style={{ color: "red", marginBottom: "1rem" }}>
      {message}
    </div>
  );
}

export default ErrorMessage;
