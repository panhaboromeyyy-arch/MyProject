import { useEffect, useState } from 'react';

import api from '../api/api';
export default function ProfileBuilder() {
  const [profile, setProfile] = useState({
    title: '',
    bio: '',
    phone: '',
    location: '',
    skills: '',
    experience: '',
    education: '',
    portfolio_url: ''
  });
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/profile')
      .then((response) => {
        if (response.data) {
          setProfile((current) => ({ ...current, ...response.data }));
        }
      })
      .catch((err) => {
        if (err.response?.status !== 404) {
          setError('Failed to load your saved profile.');
        }
      });
  }, []);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await api.put('/profile', profile);
      setSuccess('Resume profile saved successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save profile.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white p-8 shadow-md rounded-xl border border-slate-100">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">Dynamic CV / Profile Builder</h2>
        {success && <div className="mb-4 p-3 bg-green-50 text-green-600 text-sm rounded-lg">{success}</div>}
        {error && <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg">{error}</div>}
        
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Professional Title</label>
              <input 
                type="text" 
                name="title" 
                value={profile.title} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g. Full Stack Developer"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <input 
                type="text" 
                name="phone" 
                value={profile.phone} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+123 456 789"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
            <input 
              type="text" 
              name="location" 
              value={profile.location} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="City, Country"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Professional Bio</label>
            <textarea 
              name="bio" 
              value={profile.bio} 
              onChange={handleChange} 
              rows="3"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Brief summary of your background..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Skills (Comma separated)</label>
            <input 
              type="text" 
              name="skills" 
              value={profile.skills} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="React, Laravel, Tailwind, Git"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Work Experience & Education</label>
            <textarea 
              name="experience" 
              value={profile.experience} 
              onChange={handleChange} 
              rows="4"
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Detail your past roles, companies, and academic history..."
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Portfolio / GitHub Link</label>
            <input 
              type="url" 
              name="portfolio_url" 
              value={profile.portfolio_url} 
              onChange={handleChange} 
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="https://yourportfolio.com"
            />
          </div>

          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 transition">
            Save Resume Profile
          </button>
        </form>
      </div>
    </div>
  );
}
