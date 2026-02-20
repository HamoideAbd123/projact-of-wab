// src/pages/Phones.jsx
import React, { useState } from "react";
import { phones } from "../data/phones";
import PhoneCard from "../components/PhoneCard";
import PhoneDetails from "../components/PhoneDetails";

export default function Phones() {
  const [selectedPhone, setSelectedPhone] = useState(null);

  return (
    <div className="p-6">
      {!selectedPhone ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {phones.map((phone) => (
            <PhoneCard key={phone.id} phone={phone} onSelect={setSelectedPhone} />
          ))}
        </div>
      ) : (
        <PhoneDetails phone={selectedPhone} onBack={() => setSelectedPhone(null)} />
      )}
    </div>
  );
}
