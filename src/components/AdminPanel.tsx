import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User, UserRole } from '../data/users';
import { motion } from 'framer-motion';
import { Plus, MapPin, Building, Mail, Lock, User as UserIcon } from 'lucide-react';

const AdminPanel: React.FC = () => {
  const { users, addUser } = useAuth();
  
  const [formData, setFormData] = useState({
    hotelName: '',
    address: '',
    city: '',
    role: 'basic' as UserRole,
    email: '',
    password: '',
    lat: '',
    lng: ''
  });

  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const generateEmail = () => {
    if (!formData.hotelName || !formData.role) return;
    const hotelDomain = formData.hotelName.toLowerCase().replace(/\s+/g, '') + '.com';
    const email = `SGO-${formData.role.charAt(0).toUpperCase() + formData.role.slice(1)}@${hotelDomain}`;
    setFormData(prev => ({ ...prev, email }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Determine maxRadius based on role
    let maxRadius = 5;
    if (formData.role === 'pro') maxRadius = 10;
    if (formData.role === 'advanced') maxRadius = 20;
    if (formData.role === 'enterprise') maxRadius = 999;

    const newUser: User = {
      id: Date.now().toString(),
      name: `Manager ${formData.hotelName}`,
      email: formData.email,
      password: formData.password,
      role: formData.role,
      hotelName: formData.hotelName,
      address: formData.address,
      allowedCity: formData.city,
      maxRadius: maxRadius,
      coordinates: formData.lat && formData.lng ? {
        lat: parseFloat(formData.lat),
        lng: parseFloat(formData.lng)
      } : undefined
    };

    addUser(newUser);
    setSuccess(`User ${newUser.email} created successfully!`);
    
    // Reset form
    setFormData({
      hotelName: '',
      address: '',
      city: '',
      role: 'basic',
      email: '',
      password: '',
      lat: '',
      lng: ''
    });

    setTimeout(() => setSuccess(''), 3000);
  };

  return (
    <div className='space-y-8'>
      <div className='glass-card p-8 rounded-2xl'>
        <div className='flex items-center gap-4 mb-6'>
          <div className='p-3 bg-blue-500/20 rounded-xl text-blue-400'>
            <UserIcon size={24} />
          </div>
          <div>
            <h2 className='text-2xl font-bold'>Admin User Management</h2>
            <p className='text-slate-400'>Create and manage hotel accounts</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
            {/* Hotel Details */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-blue-400 mb-4'>Hotel Information</h3>
              
              <div>
                <label className='block text-sm text-slate-400 mb-1'>Hotel Name</label>
                <div className='relative'>
                  <Building className='absolute left-3 top-3 text-slate-500' size={18} />
                  <input
                    type='text'
                    name='hotelName'
                    value={formData.hotelName}
                    onChange={handleInputChange}
                    onBlur={generateEmail}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='e.g. Grand Pangrango'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm text-slate-400 mb-1'>Address</label>
                <div className='relative'>
                  <MapPin className='absolute left-3 top-3 text-slate-500' size={18} />
                  <input
                    type='text'
                    name='address'
                    value={formData.address}
                    onChange={handleInputChange}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='Full Address'
                    required
                  />
                </div>
              </div>

              <div>
                <label className='block text-sm text-slate-400 mb-1'>City (Restriction)</label>
                <input
                  type='text'
                  name='city'
                  value={formData.city}
                  onChange={handleInputChange}
                  className='w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none'
                  placeholder='e.g. Bogor'
                  required
                />
              </div>

              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-sm text-slate-400 mb-1'>Latitude</label>
                  <input
                    type='text'
                    name='lat'
                    value={formData.lat}
                    onChange={handleInputChange}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='-6.597...'
                  />
                </div>
                <div>
                  <label className='block text-sm text-slate-400 mb-1'>Longitude</label>
                  <input
                    type='text'
                    name='lng'
                    value={formData.lng}
                    onChange={handleInputChange}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='106.80...'
                  />
                </div>
              </div>
            </div>

            {/* Account Details */}
            <div className='space-y-4'>
              <h3 className='text-lg font-semibold text-green-400 mb-4'>Account Credentials</h3>
              
              <div>
                <label className='block text-sm text-slate-400 mb-1'>Subscription Package</label>
                <select
                  name='role'
                  value={formData.role}
                  onChange={(e) => {
                    handleInputChange(e);
                    // Regenerate email if role changes
                    const hotelDomain = formData.hotelName.toLowerCase().replace(/\s+/g, '') + '.com';
                    const email = `SGO-${e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1)}@${hotelDomain}`;
                    if(formData.hotelName) setFormData(prev => ({ ...prev, role: e.target.value as UserRole, email }));
                  }}
                  className='w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white focus:border-blue-500 outline-none'
                >
                  <option value='basic'>Basic (5 Hotels)</option>
                  <option value='pro'>Pro (10 Hotels)</option>
                  <option value='advanced'>Advanced (20 Hotels)</option>
                  <option value='enterprise'>Enterprise (Unlimited)</option>
                </select>
              </div>

              <div>
                <label className='block text-sm text-slate-400 mb-1'>Email Username</label>
                <div className='relative'>
                  <Mail className='absolute left-3 top-3 text-slate-500' size={18} />
                  <input
                    type='text'
                    name='email'
                    value={formData.email}
                    onChange={handleInputChange}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='Auto-generated...'
                    readOnly
                  />
                </div>
                <p className='text-xs text-slate-500 mt-1'>Auto-generated format: SGO-[Package]@[Hotel].com</p>
              </div>

              <div>
                <label className='block text-sm text-slate-400 mb-1'>Password</label>
                <div className='relative'>
                  <Lock className='absolute left-3 top-3 text-slate-500' size={18} />
                  <input
                    type='text'
                    name='password'
                    value={formData.password}
                    onChange={handleInputChange}
                    className='w-full bg-slate-800 border border-slate-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:border-blue-500 outline-none'
                    placeholder='Set password...'
                    required
                  />
                </div>
              </div>

              <div className='pt-8'>
                <button
                  type='submit'
                  className='w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-500 hover:to-emerald-500 text-white font-bold py-3 rounded-xl transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2'
                >
                  <Plus size={20} />
                  Create Hotel Account
                </button>
              </div>
            </div>
          </div>
        </form>

        {success && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-6 p-4 bg-green-500/20 border border-green-500/50 rounded-xl text-green-400 text-center font-medium'
          >
            {success}
          </motion.div>
        )}
      </div>

      {/* User List */}
      <div className='glass-card p-8 rounded-2xl'>
        <h3 className='text-xl font-bold mb-6'>Registered Hotels</h3>
        <div className='overflow-x-auto'>
          <table className='w-full text-left'>
            <thead>
              <tr className='border-b border-slate-700 text-slate-400'>
                <th className='p-3'>Hotel Name</th>
                <th className='p-3'>Email</th>
                <th className='p-3'>Role</th>
                <th className='p-3'>City</th>
                <th className='p-3'>Radius</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className='border-b border-slate-800 hover:bg-slate-800/30'>
                  <td className='p-3 font-medium'>{user.hotelName}</td>
                  <td className='p-3 text-slate-400'>{user.email}</td>
                  <td className='p-3'>
                    <span className={`px-2 py-1 rounded text-xs font-bold uppercase
                      ${user.role === 'basic' ? 'bg-slate-700 text-slate-300' : ''}
                      ${user.role === 'pro' ? 'bg-blue-900/50 text-blue-400' : ''}
                      ${user.role === 'advanced' ? 'bg-purple-900/50 text-purple-400' : ''}
                      ${user.role === 'enterprise' ? 'bg-amber-900/50 text-amber-400' : ''}
                    `}>
                      {user.role}
                    </span>
                  </td>
                  <td className='p-3 text-slate-400'>{user.allowedCity || 'All'}</td>
                  <td className='p-3 text-slate-400'>{user.maxRadius === 999 ? 'Unlimited' : user.maxRadius}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
