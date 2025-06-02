import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiConnector } from '../ApiConnector/Axios';
import { useAuth } from '../Context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await apiConnector('POST','http://localhost:4000/api/v1/auth/login', formData);
      if (res.status !== 200) {
        throw new Error('Login failed');
      }
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      login(res.data.token); 
      navigate('/chargers');
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 md:px-8 bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364]">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-6 text-white font-serif">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="input input-bordered w-full bg-white/10 text-white placeholder:text-white/70"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="input input-bordered w-full bg-white/10 text-white placeholder:text-white/70"
            onChange={handleChange}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="btn w-full bg-black text-white hover:bg-gray-800">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
