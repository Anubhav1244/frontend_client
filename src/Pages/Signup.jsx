import React, { useState } from 'react';
 // or use 'axios' with full URL
import { Link, useNavigate } from 'react-router-dom';
import { apiConnector } from '../ApiConnector/Axios';
import { SIGNUP } from '../ApiConnector/apis';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const res =await apiConnector('POST',SIGNUP, formData);
      console.log(res);
      if (res.status !== 200) {
        throw new Error('Signup failed');
    }
   
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.error || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2027] via-[#203a43] to-[#2c5364] flex items-center justify-center">
      <div className="backdrop-blur-md bg-white/10 border border-white/20 shadow-lg rounded-2xl p-10 w-full max-w-sm text-white">
        <h2 className="text-3xl font-bold mb-6 text-center font-serif">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>
          <div>
            <label className="label">
              <span className="label-text text-white">Confirm Password</span>
            </label>
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="input input-bordered w-full bg-white/20 text-white placeholder-white/70 border-white/30 focus:outline-none focus:ring-2 focus:ring-white/50"
              required
            />
          </div>

          {error && (
            <div className="text-red-400 text-sm text-center">{error}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-full mt-4 backdrop-blur-sm bg-white/20 hover:bg-white/30 text-white border-white/30"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-white/70">
          Already have an account?{' '}
          <Link to="/login" className="underline text-white hover:text-white/90">
          <a className="underline text-white hover:text-white/90" >
            Login
          </a>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;
