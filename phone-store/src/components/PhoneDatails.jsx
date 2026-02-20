// src/components/PhoneDetails.jsx
import React from "react";

export default function PhoneDetails({ phone, onBack }) {
  return (
    <div className="p-6 bg-white shadow-lg rounded-2xl">
      <button
        onClick={onBack}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg mb-4"
      >
        رجوع
      </button>
      <img src={phone.image} alt={phone.name} className="w-60 mx-auto" />
      <h1 className="text-2xl font-bold mt-4">{phone.name}</h1>
      <p className="text-gray-600">{phone.price}</p>
      <ul className="mt-4 space-y-2">
        <li><b>الشاشة:</b> {phone.specs.screen}</li>
        <li><b>المعالج:</b> {phone.specs.processor}</li>
        <li><b>الكاميرا:</b> {phone.specs.camera}</li>
        <li><b>البطارية:</b> {phone.specs.battery}</li>
        <li><b>النظام:</b> {phone.specs.os}</li>
      </ul>
    </div>
  );
}
