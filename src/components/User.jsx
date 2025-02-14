import React from 'react';

const User = ({ name, location, contact }) => {
  return (
    <div className="user-card">
      <h2 className="user-name">{name}</h2>
      <p className="user-location">📍 {location}</p>
      <p className="user-contact">📞 {contact}</p>
    </div>
  );
};

export default User;
