import React from 'react';
import { useNavigate } from 'react-router-dom';

const stats = [
  { label: 'Chargers Online', value: 128 },
  { label: 'Cities Covered', value: 18 },
  { label: 'Registered Users', value: 550 },
];

const features = [
  'Interactive EV Charger Map',
  'Real-time Charger Availability',
  'Secure Admin Login',
  'Add / Edit / Remove Chargers',
  'Reverse Geolocation Support',
  'Fully Responsive Design',
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Hero */}
      <section className="py-16 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold font-serif mb-4">
          Charger Management System
        </h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
          Monitor, manage, and maintain EV charging stations across the country – all from one intuitive dashboard.
        </p>
        <button
          onClick={() => navigate('/login')}
          className="mt-8 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-200 transition"
        >
          Get Started
        </button>
      </section>

      {/* Features */}
      <section className="bg-gray-100 text-black py-12 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Core Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
              <h3 className="text-lg font-semibold mb-2">✅ {feature}</h3>
              <p className="text-sm text-gray-600">
                A core part of the system helping users interact seamlessly with EV infrastructure.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Live Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className="text-4xl font-bold text-green-400">{stat.value}+</p>
                <p className="text-sm text-gray-300 mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default Home;
