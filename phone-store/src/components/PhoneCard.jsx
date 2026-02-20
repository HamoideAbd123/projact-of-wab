// src/components/PhoneCard.jsx
import React from "react";

export default function PhoneCard({ phone, onSelect }) {
  return (
    <div
      className="bg-white shadow-lg rounded-2xl p-4 hover:scale-105 transition cursor-pointer"
      onClick={() => onSelect(phone)}
    >
      <img src={phone.image} alt={phone.name} className="w-40 h-40 mx-auto" />
      <h2 className="text-xl font-bold mt-3">{phone.name}</h2>
      <p className="text-gray-600">{phone.price}</p>
    </div>
  );
}
