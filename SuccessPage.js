import React from 'react';
import { useLocation, Link } from 'react-router-dom';

function SuccessPage() {
  const { state } = useLocation();

  return (
    <div className="success-page">
      <h2>Submitted Details</h2>
      <ul>
        {Object.entries(state || {}).map(([key, value]) => (
          <li key={key}><strong>{key}:</strong> {value}</li>
        ))}
      </ul>
      <Link to="/">Back to form</Link>
    </div>
  );
}

export default SuccessPage;
